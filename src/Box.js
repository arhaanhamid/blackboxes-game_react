import React from "react"

export default function Box(props) {
    const styles = {
        backgroundColor: props.switch ? "white" : "black"
    }
   
    return (
        <div style={styles} className="box" onClick={props.toggle}>
        </div>
    )
}