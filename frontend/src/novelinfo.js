import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useParams} from 'react-router-dom';

function NovelInfo(location) {
    let {id} = useParams();
    console.log(id)
    return (
        <div><li>{id}</li></div>
        )
}
export default NovelInfo