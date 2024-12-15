import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
    <div>
      <div className="card" style={{width: "18rem", height:"25rem"}}>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h6 className="card-title">{title}</h6>
    {/*<p className="card-text">{description}</p>*/}
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read more</a>
  </div>
</div>
</div>
);

  }
}

export default NewsItem;
