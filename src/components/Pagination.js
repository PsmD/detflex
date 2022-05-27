import styled from "styled-components";

const pagesPerList = 10;

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  setmaxPageNumberLimit,
  maxPageNumberLimit,
  setminPageNumberLimit,
  minPageNumberLimit,
}) {
  const pageLogic = () => {
    let lastPaginationNumber = Math.ceil(currentPage / pagesPerList) * pagesPerList;
    let firstPaginationNumber = lastPaginationNumber - 9;

    if (totalPages === 1) return;
    if (totalPages < currentPage) {
      currentPage = totalPages;
    }
    if (lastPaginationNumber > totalPages) lastPaginationNumber = totalPages;
    return {
      firstPaginationNumber,
      lastPaginationNumber,
    };
  };

  const listNumbers = [];

  for (let i = pageLogic().firstPaginationNumber; i <= pageLogic().lastPaginationNumber; i++) {
    listNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pagesPerList);
      setminPageNumberLimit(minPageNumberLimit + pagesPerList);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pagesPerList == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pagesPerList);
      setminPageNumberLimit(minPageNumberLimit - pagesPerList);
    }
  };

  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  return (
    <Footer>
      <First onClick={() => setCurrentPage(1)} disabled={isFirstPage}>
        &lt;&lt;
      </First>
      <Prev onClick={handlePrevbtn} disabled={isFirstPage}>
        &lt;
      </Prev>
      {listNumbers.map((lN) => {
        return (
          <Nums lN={lN} currentPage={currentPage} key={lN} id={lN} onClick={handleClick}>
            {lN}
          </Nums>
        );
      })}
      <Next onClick={handleNextbtn} disabled={isLastPage}>
        &gt;
      </Next>
      <Last onClick={() => setCurrentPage(totalPages)} disabled={isLastPage}>
        &gt;&gt;
      </Last>
    </Footer>
  );
}

export default Pagination;

const Footer = styled.ul`
  display: flex;
  list-style: none;
  width: 700px;
  color: #262626;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 30px;
  align-items: center;
  font-weight: bold;
  font-size: 17px;
  text-shadow: 2px 2px #c7cdd4;

  @media screen and (max-width: 1300px) {
    width: 1150px;
  }

  @media ${({ theme }) => theme.device.small} {
    width: 850px;
  }

  @media screen and (max-width: 750px) {
    width: 600px;
  }

  @media ${({ theme }) => theme.device.smaller} {
    width: 450px;
    font-size: 16px;
  }
`;

const Nums = styled.li`
  pointer-events: ${(props) => props.lN == props.currentPage && "none"};
  font-weight: ${(props) => props.lN == props.currentPage && "bold"};
  zoom: ${(props) => props.lN == props.currentPage && "1.3"};
  margin: 0 12px;
  margin-bottom: ${(props) => props.lN == props.currentPage && "7px"};
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    transform: translateY(-3px);
  }

  @media screen and (max-width: 750px) {
    margin: 0 5px;
  }

  @media ${({ theme }) => theme.device.smaller} {
    margin: 0 3px;
  }
`;

const First = styled.li`
  color: ${({ disabled }) => disabled && "#9f9f9f"};
  pointer-events: ${({ disabled }) => disabled && "none"};
  text-shadow: ${({ disabled }) => disabled && "2px 2px #E4E4E4"};
  cursor: pointer;
  transition: all 0.4s ease;
  margin-right: 12px;
  &:hover {
    transform: translateY(-3px);
  }
  @media ${({ theme }) => theme.device.smaller} {
    margin-right: 5px;
  }
`;

const Prev = styled.li`
  color: ${({ disabled }) => disabled && "#9f9f9f"};
  pointer-events: ${({ disabled }) => disabled && "none"};
  text-shadow: ${({ disabled }) => disabled && "2px 2px #E4E4E4"};
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;

const Next = styled.li`
  color: ${({ disabled }) => disabled && "#9f9f9f"};
  pointer-events: ${({ disabled }) => disabled && "none"};
  text-shadow: ${({ disabled }) => disabled && "2px 2px #E4E4E4"};
  cursor: pointer;
  transition: all 0.4s ease;
  margin-right: 12px;
  &:hover {
    transform: translateY(-3px);
  }
  @media ${({ theme }) => theme.device.smaller} {
    margin-right: 5px;
  }
`;

const Last = styled.li`
  color: ${({ disabled }) => disabled && "#9f9f9f"};
  pointer-events: ${({ disabled }) => disabled && "none"};
  text-shadow: ${({ disabled }) => disabled && "2px 2px #E4E4E4"};
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;
