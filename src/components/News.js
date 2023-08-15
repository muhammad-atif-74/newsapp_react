import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps ={
        country: 'us',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string.isRequired,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super()
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef54bbdbc9a4518b5cca3dc4c70072f&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url)
        let parsedDate = await data.json()
        this.setState({
            articles: parsedDate.articles,
            totalResults: parsedDate.totalResults,
            loading: false
        })
    }

    async handleNextClick() {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ loading: true })
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef54bbdbc9a4518b5cca3dc4c70072f&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
            let data = await fetch(url)
            let parsedDate = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedDate.articles,
                loading: false
            })
        }

    }
    async handlePreviousClick() {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef54bbdbc9a4518b5cca3dc4c70072f&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
        let data = await fetch(url)
        let parsedDate = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedDate.articles,
            loading: false

        })
    }
    render() {
        return (
            <>

                <div className="container my-4" >
                    <h2>JS-News Top Headlines</h2>
                    <p>Showing Results for : {this.props.category}</p>
                    <hr style={{ border: '2px solid red' }} />
                    {this.state.loading && <Loader />}
                    <div className="row row-cols-4">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div key={element.url} className="col my-2" >
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 85) : ""} imageUrl={element.urlToImage ? element.urlToImage : 'https://s.hdnux.com/photos/01/34/03/56/24132500/3/rawImage.jpg'} newsUrl={element.url} date={(element.publishedAt).split('T')[0]} author={element.author} />
                            </div>
                        })}
                    </div>
                </div>
                <div className="container my-2">
                    <div className="d-flex justify-content-between">
                        <button disabled={this.state.page > 0 ? false : true} className="btn btn-info" onClick={this.handlePreviousClick.bind(this)}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-info" onClick={this.handleNextClick.bind(this)}>Next &rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
