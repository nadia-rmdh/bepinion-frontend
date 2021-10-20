import React, { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function usePagination(totalData, defaultPage, totalPage, onChangedCurrentPage) {
    const [currentPage, setCurrentPage] = useState(defaultPage);

    useEffect(() => onChangedCurrentPage(currentPage), [currentPage, onChangedCurrentPage])

    const next = useCallback(() => {
        setCurrentPage(prevState => prevState === (totalPage - 1) ? prevState : prevState + 1);
    }, [totalPage])

    const prev = useCallback(() => {
        setCurrentPage(prevState => prevState === 0 ? prevState : prevState - 1);
    }, []);

    const goto = useCallback((page) => {
        setCurrentPage(page);
    }, [])

    const PaginationComponent = useMemo(() => {
        return (props) => <CustomHookPaginationComponent
            handleFirst={() => goto(0)}
            handleLast={() => goto(totalPage - 1)}
            handleNext={next}
            handlePrev={prev}
            handleGoto={goto}
            currentPage={currentPage}
            count={totalPage}
        />;
    }, [goto, next, prev, currentPage, totalPage]);
    return { currentPage, next, prev, goto, totalPage, PaginationComponent };
}

const CustomHookPaginationComponent = ({ handleFirst, handleLast, handleNext, handlePrev, handleGoto, count, currentPage }) => {
    return (
        <Pagination className="pagination-hub d-flex justify-content-center">
            {handleFirst && <PaginationItem disabled={currentPage - 1 >= 0 ? false : true}>
                <PaginationLink first onClick={handleFirst} disabled={currentPage === 0} />
            </PaginationItem>}
            {handlePrev && <PaginationItem disabled={currentPage - 1 >= 0 ? false : true}>
                <PaginationLink previous onClick={handlePrev} disabled={currentPage === 0} />
            </PaginationItem>}
            {currentPage - 3 >= 0 &&
                <PaginationItem disabled>
                    <PaginationLink className="text-dark">...</PaginationLink>
                </PaginationItem>
            }
            {currentPage - 2 >= 0 &&
                <PaginationItem className="d-none d-md-block">
                    <PaginationLink onClick={() => handleGoto(currentPage - 2)}>{currentPage - 1}</PaginationLink>
                </PaginationItem>
            }
            {currentPage - 1 >= 0 &&
                <PaginationItem>
                    <PaginationLink onClick={() => handleGoto(currentPage - 1)}>{currentPage}</PaginationLink>
                </PaginationItem>
            }
            <PaginationItem active disabled>
                <PaginationLink onClick={() => handleGoto(currentPage)}>{currentPage + 1}</PaginationLink>
            </PaginationItem>
            {currentPage + 1 < count &&
                <PaginationItem>
                    <PaginationLink onClick={() => handleGoto(currentPage + 1)}>{currentPage + 2}</PaginationLink>
                </PaginationItem>
            }
            {currentPage + 2 < count &&
                <PaginationItem className="d-none d-md-block">
                    <PaginationLink onClick={() => handleGoto(currentPage + 2)}>{currentPage + 3}</PaginationLink>
                </PaginationItem>
            }
            {/* {[...Array(count).keys()].map(index => (
                <PaginationItem key={index} active={currentPage === index} disabled={currentPage === index}>
                    <PaginationLink onClick={() => handleGoto(index)}>{index + 1}</PaginationLink>
                </PaginationItem>
            ))} */}
            {currentPage + 3 < count &&
                <PaginationItem disabled>
                    <PaginationLink className="text-dark">...</PaginationLink>
                </PaginationItem>
            }
            <PaginationItem disabled={currentPage + 1 < count ? false : true}>
                <PaginationLink next onClick={handleNext} disabled={currentPage === count - 1} />
            </PaginationItem>
            <PaginationItem disabled={currentPage + 1 < count ? false : true}>
                <PaginationLink last onClick={handleLast} disabled={currentPage === count - 1} />
            </PaginationItem>
        </Pagination>
    )
}