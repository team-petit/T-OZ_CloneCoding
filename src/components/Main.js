import React from "react";

export default function Main(){
    const [numbers, setnumber] = React.useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);

    
    const arrays = numbers.map((rows, idx) => {
        return (
        <div className="GridCell" key={idx}>
            {rows.map((array, idx) => {
                return (
                    <div className="GridElement" key={idx}>{array}</div>
                );
            })}
        </div>
        )
    })

    return (
        <main>
            <div className="container">
                <div className="GameContainer">
                    {arrays}
                </div>
            </div>
        </main>
    )
}