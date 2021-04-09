import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const NextPreviousPage = ({ counter, limit, skip, setSkip, page, setPage }) => {
    const [iconStyle, setIconStyle] = useState("icon");

    // If page * limit (100) is less than counter number : next page skip limit of characters
    const nextPage = () => {
        if (page * limit < counter) {
            setPage(page + 1);
            let newSkip = skip + limit;
            setSkip(newSkip);
        }
    };

    // If page * limit (100) is less than counter number : previous page skip limit of characters

    const previousPage = () => {
        if (page * limit < counter) {
            setPage(page - 1);
            let newSkip = skip - limit;
            setSkip(newSkip);
        }
    };

    return (
        <>
            <div className="next-previous">
                {page > 1 && (
                    <button
                        onClick={() => {
                            previousPage();
                        }}
                    >
                        <div>
                            <FontAwesomeIcon
                                className={iconStyle}
                                icon="caret-left"
                            />
                            Page précédente
                        </div>
                    </button>
                )}
                <button
                    onClick={() => {
                        nextPage();
                    }}
                >
                    <div>
                        Page suivante
                        <FontAwesomeIcon
                            className={iconStyle}
                            icon="caret-right"
                        />
                    </div>
                </button>
            </div>
        </>
    );
};

export default NextPreviousPage;
