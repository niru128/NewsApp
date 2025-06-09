
import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = { progress: 0 }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}

          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} country="us" pageSize={12} category="general" key="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} country="us" pageSize={12} category="business" key="general" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} country="us" pageSize={12} category="entertainment" key="" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} country="us" pageSize={12} category="health" key="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} country="us" pageSize={12} category="science" key="v" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} country="us" pageSize={12} category="sports" key="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} country="us" pageSize={12} category="technology" key="technology" />} />
          </Routes>
        </Router>


      </div>
    )
  }
}
