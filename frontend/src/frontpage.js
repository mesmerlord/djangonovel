import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';


export default class NovelList extends React.Component {
    state = {
        novels1:[]
    }
    headers = {
        'Content-Type': 'application/json'
    }
    axiFetch = () => {
        axios.get(`http://127.0.0.1:8000/api/category/`, {headers: this.headers})
      .then(res => {
        const novels = res.data;
        this.setState({ novels1:novels });
        console.log(res.data)
      }).catch(err => {console.log(err)})
    }
    componentDidMount() {
        console.log("mounted")
        this.axiFetch();
        
    }
    
    render() {
        const categories = this.state.novels1.map((category) => {
           return <li>{category.name}</li>
        })
        return (
            <>
                <Button variant="contained" color = "primary">Hello</Button>
                <ul>
                    {categories}
                </ul>
            </>
            )
      }
}