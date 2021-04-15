import React, { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function usePagination(array, perPage = 10, defaultPage, onChangedCurrentPage) {
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const dataPerPage = useMemo(() => {
        return Array(Math.ceil(array.length / perPage))
            .fill()
            .map((_, index) => index * perPage)
            .map(begin => array.slice(begin, begin + perPage));
    }, [array, perPage]);

    const totalPage = useMemo(() => dataPerPage.length, [dataPerPage]);

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

    const data = useMemo(() =>{
        let tempData = dataPerPage[currentPage] ?? [];
        if(tempData?.length <= 0){
            tempData = dataPerPage[0];
            setCurrentPage(0);
        }
        return tempData;
    }, [currentPage, dataPerPage])

    const PaginationComponent = useMemo(() => {
        return (props) => <CustomHookPaginationComponent
            handleFirst={() => goto(0)}
            handleLast={() => goto(totalPage - 1)}
            handleNext={next}
            handlePrev={prev}
            handleGoto={goto}
            currentPage={(data?.length ?? 0) > 0 ? currentPage : 0}
            count={totalPage}
        />;
    }, [goto, next, prev, currentPage, totalPage, data]);
    return { data, currentPage, next, prev, goto, totalPage, PaginationComponent };
}

const CustomHookPaginationComponent = ({ handleFirst, handleLast, handleNext, handlePrev, handleGoto, count, currentPage }) => {
    return (
        <Pagination className="pagination-hub d-flex justify-content-center">
            {handleFirst && <PaginationItem>
                <PaginationLink first onClick={handleFirst} disabled={currentPage === 0} />
            </PaginationItem>}
            {handlePrev && <PaginationItem>
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
            <PaginationItem>
                <PaginationLink next onClick={handleNext} disabled={currentPage === count - 1} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last onClick={handleLast} disabled={currentPage === count - 1} />
            </PaginationItem>
        </Pagination>
    )
}