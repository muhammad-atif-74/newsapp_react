import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, date, auther } = this.props;
        return (
            <>
                <div className="card" style={{borderRadius: '0', height: '450px', position: 'relative', border: 'none', boxShadow: '0 0 5px rgba(0,0,0,0.12)'}}>
                    <img src={imageUrl} className="card-img-top" alt="..." style={{height: '180px', borderRadius: '0'}} />
                        <div className="card-body">
                            <small className='text-secondary'>{date}</small>
                            <h5 className="card-title my-3">{title}..</h5>
                            <p className="card-text">{description}..</p>
                            <a href={newsUrl} className="btn btn-secondary" style={{position: 'absolute', bottom: '15px', borderRadius: '0'}}>View More</a>
                        </div>
                </div>
            </>
        )
    }
}

export default NewsItem
