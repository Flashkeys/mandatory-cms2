import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = (props) => {
    const [comment, SetComment] = useState(null);

    useEffect(() => {
        axios.get(`http://192.168.99.100:8080/api/collections/get/Comment?filter[_id]=${props.match.params.id}`)
            .then((res) => SetComment(res.data.entries[0]));

    }, []);
    return (
        <div>
            <table>
                <tbody>
                    {comment.map((result) => (
                        <tr key={result._id}>
                            <td>{result.Name}</td>
                            <td>{result.Text}</td>
                            <td>{result.Rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Comments