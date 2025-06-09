import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Loading from './Loading';
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 12,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {

    super();
    this.state = {
      articles: [],
      pages: 1
    }

  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9a4c9a2fefb4897a61b3e29ebfa06e9&page=${this.state.pages}&pageSize=12`;
    const data = await fetch(url);
    this.props.setProgress(30);
    const parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  prevPage = async () => {
    this.setState({ pages: this.state.pages - 1 });
    this.updateNews();

  }

  nxtPage = async () => {
    if (this.state.pages + 1 > Math.ceil(this.state.totalResults / 12)) {

    } else {

      this.setState({ pages: this.state.pages + 1 });
      this.updateNews();
    }


  }


  render() {


    return (
      <div>
        <div className='container my-3'>
          <h1>Headlines</h1>
          {this.state.loading && <Loading />}
          <div className='row'>
           
            {
              !this.state.loading && this.state.articles.map((element) => {
                return (
                  <div className='col-md-4' key={element.newsUrl}>
                    <Newsitems title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 60) : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                  </div>

                )
              })
            }

          </div>
          <div className='container d-flex justify-content-between'>
            <button type="button" disabled={this.state.pages <= 1} onClick={this.prevPage} className="btn btn-dark">Previous</button>
            <button type="button" disabled={this.state.pages + 1 > Math.ceil(this.state.totalResults / 12)} onClick={this.nxtPage} className="btn btn-dark">Next</button>
          </div>


        </div>
      </div>
    )
  }
}

export default News
