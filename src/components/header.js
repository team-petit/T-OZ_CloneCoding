export default function Header()
{
    return(
        <header>
            <h1 className="title">2048</h1>
            <div className="score">score</div>
            <div className="best">best</div>
            <button className="restart">New Game</button>
        </header>
    )
}