import React from "react";

const Carousel = () => {
    const [slideClassesArray, setSlideClassesArray] = React.useState(['block', 'hidden', 'hidden']);
    const [activeSlide, setActiveSlide] = React.useState(0);

    const handleBack = () => {
        if (activeSlide === 0) {
            setActiveSlide(2)
        } else {
            setActiveSlide(activeSlide - 1);
        }
    }

    const handleNext = () => {
        if (activeSlide === 2) {
            setActiveSlide(0)
        } else {
            setActiveSlide(activeSlide + 1);
        }
    }

    React.useEffect(() => {
        const newArray = [...slideClassesArray];
        newArray[activeSlide] = 'block';
        for (let i = 0; i < 3; i++) {
            if (i !== activeSlide) {
                newArray[i] = 'hidden';
            }
        }
        setSlideClassesArray(newArray);
    }, [activeSlide]) 

    return (
        <div className="w-8/12 p-6 absolute ml-7">
            {/* <img src="https://media.giphy.com/media/qAWWpdxRzQCFEVGbiJ/giphy.gif" alt="" className="w-32" /> */}
            <h1 className="text-lg mb-4">A brief history of Tic Tac Toe</h1>
            <div>
                <div className="h-[460px] flex">
                    <div className={slideClassesArray[1]}>
                        <img
                            className="w-96 m-auto rounded h-56"
                            alt=""
                            src="https://images.prismic.io/mystique/24d6af7e-53ba-47c4-baef-da7de5b49130_86c7e78d-48e2-4414-9c99-60c5ca83c906-13944-cairo-skip-the-line-tickets---pyramids-of-giza-01.webp?auto=compress,format" />
                        <p className="w-6/12 m-auto mt-2">
                            Games played on three-in-a-row boards can be traced back to ancient Egypt,
                            where such game boards have been found on roofing tiles dating from around 1300 BC.
                            An early variation of tic-tac-toe was played in the Roman Empire, around the first century BC.
                            It was called terni lapilli (three pebbles at a time) and instead of having any number of pieces,
                            each player had only three; thus, they had to move them around to empty spaces to keep playing.
                            The game's grid markings have been found chalked all over Rome. 
                        </p>
                    </div>
                    <div className={slideClassesArray[2]}>
                        <img
                            className="w-96 m-auto rounded h-56"
                            alt=""
                            src="https://c8.alamy.com/comp/MG5JHR/temple-bar-london-england-in-1800-MG5JHR.jpg"
                        />
                        <p className="w-6/12 m-auto mt-2">
                            The different names of the game are more recent. The first print reference to "noughts and crosses",
                            the British name, appeared in 1858, in an issue of Notes
                            and Queries. The first print reference to a game called "tick-tack-toe" occurred in 1884, but referred to
                            "a children's game played on a slate, consisting of trying with the eyes shut to bring the pencil down on
                            one of the numbers of a set, the number hit being scored". "Tic-tac-toe" may also derive from "tick-tack",
                            the name of an old version of backgammon first described in 1558. 
                        </p>
                    </div>
                    <div className={slideClassesArray[0]}>
                        <img
                            className="w-96 m-auto rounded h-56"
                            alt=""
                            src="https://www.tata.com/content/dam/tata/images/newsroom/heritage/desktop/eka_banner_desktop_1920x1080.jpg"
                        />
                        <p className="w-6/12 m-auto mt-2">
                            In 1952, OXO (or Noughts and Crosses), developed by British computer scientist Sandy Douglas for the EDSAC
                            computer at the University of Cambridge, became one of the first known video games.The computer player could
                            play perfect games of tic-tac-toe against a human opponent. In 1975, tic-tac-toe was also used by MIT
                            students to demonstrate the computational power of Tinkertoy elements. The Tinkertoy computer,
                            made out of (almost) only Tinkertoys, is able to play tic-tac-toe perfectly. It is currently on display
                            at the Museum of Science, Boston.
                        </p>
                    </div>
                </div>
                <div className="flex justify-between w-80 m-auto">
                    <button
                    onClick={handleBack}
                    className="bg-slate-500 p-2 cursor-pointer text-white rounded">
                        Back
                    </button>
                    <button
                    onClick={handleNext} 
                    className="bg-slate-500 p-2 cursor-pointer text-white rounded">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Carousel;