import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        getSubs()
            .then((res) => {
                setSubs(res.data)
                setLoading(false)
            })
            .catch((err) => console.log("c--", err))
    }, [])

    const showSubs = () => {
        return (
            <>
                {subs.map((c) => <div key={c._id}
                    className="col btn btn-lg btn-block m-3">
                    <Link to={`/sub/${c.slug}`}>{c.name.toUpperCase()}</Link></div>)}
            </>
        )
    }

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading...</h4>) : showSubs()}
            </div>
        </div>
    )
}
export default SubList