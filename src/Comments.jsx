import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = (props) => {
    const [comment, SetComment] = useState(null);

    useEffect(() => {
        axios.get(`http://192.168.99.100:8080/api/collections/get/Comment?filter[_id]=${props.match.params.id}`)
            .then((res) => SetComment(res.data.entries));

    }, []);
    console.log("this data : " + JSON.stringify(comment));
    
    return (
        <div>
            <span>testing</span>
        </div>
    )
}
export default Comments