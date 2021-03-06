import React, { Component } from 'react';
import { storage } from './firebase';
import axios from 'axios';


class Addcorsecard extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeimage = this.onChangeimage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      material: '',
      description: '',
      title: '',
      price: 0,
      name:localStorage.getItem("Name")
    }
  }
  // this function will handele firebase
  handleUpload = () => {
    const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({
          progress: progress
        })
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage.ref('images')
          .child(this.state.image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({ url: url });

          })
      });
  }
  ////////////////////////////// HANDEL STATE//////////////////////
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }
  onChangeimage(e) {

    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0]
      })
      console.log('image', e.target.files[0])

    }

  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }
  ////////////////////////////// HANDEL STATE//////////////////////
  onSubmit(e) {
    e.preventDefault();
    const task = {
      Title: this.state.title,
      Desceription: this.state.description,
      image: this.state.url,
      Name: this.state.name,
      price: this.state.price
    }
    console.log(task);
    axios.post('http://localhost:8000/teacher/addcard', task) //create?
      .then(res => console.log(res.data));
    // console.log(res.data)
    window.location = '/teacher/card'
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <form className="text-center border border-light p-9" action="#!" onSubmit={this.onSubmit} >
            <div className="col">
              <h3>Add image</h3>
              <input
                type="file"
                required="true"
                className="form-control"
                onChange={this.onChangeimage}
              />
            </div>
            <button onClick={this.handleUpload}>Upload</button>

            <br />
            <iframe  title="myFrame" src={this.state.url} alt="firebase-image" width='400' height='400' ></iframe>
            <p className="h4 mb-4">matireal</p>
            <br />


            <br />

            <div className="col">
              <h3>Title  </h3>

              <input
                required="{true}"
                type="text"
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                text-align="center"
                placeholder="Insert Item Name" />
            </div>


            <br />

            <div className="col">
              <h3>Description  </h3>
              <input
                type="text"
                required="{true}"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                placeholder="Please insert a description of your item and add its current condition" />
            </div>
            <br />
            <div className="col">
              <h3>Price</h3>
              <input
                type="number"
                required="{true}"
                className="form-control"
                value={this.state.price}
                onChange={this.onChangePrice}
                placeholder="add price" />
            </div>

            <br />

            <div>
              <button type="submit" value="Submit" className="btn btn-deep-orange darken-4">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Addcorsecard;