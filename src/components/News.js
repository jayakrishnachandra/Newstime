import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

  constructor() {
    super();
   // console.log("im constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
  }

  async componentDidMount() {
    const url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4c367e2476c34e62b8214cf513c8323f&page=1&pagesize=100";
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);
      this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  handlePrevClick = async () => {
    console.log("prev");
    const url = `https://newsapi.org/v2/category=business&apiKey=4c367e2476c34e62b8214cf513c8323f&page=${this.state.page - 1}&pagesize=20`;
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    });
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
      return; // Don't proceed if next page exceeds total results
    }
    console.log("next");
    const url = `https://newsapi.org/v2/everything?q=today&sortBy=popularity&apiKey=4c367e2476c34e62b8214cf513c8323f&page=${this.state.page + 1}&pagesize=20`;
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    });
  }

  render() {
    const { articles, loading, page } = this.state;

    // Check if articles are available
    if (!articles || articles.length === 0) {
      return <div>Loading...</div>; // Or display an appropriate message
    }

    return (
      <div className="container my-3">
        <h2>Headlines</h2>
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : " "}
                  // description={element.description ? element.description : " "}
                  imageUrl={element.urlToImage ? element.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Newstime_Logo_2023.svg/2560px-Newstime_Logo_2023.svg.png"}
                  newsUrl={element.url} />
              </div>
            )
          })}
        </div>
        <div className="container d-flex justify-content-between my-5">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
