import React, { useState, useEffect } from "react";
import Item from "./Item";
import ReactPaginate from "react-paginate";

function List(props) {
  const { data, pageLimit, pageNeighbours } = props;
  const totalRecords = data.length;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / pageLimit)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + pageLimit;
    setCurrentData(data.slice(itemOffset, endOffset));
    setTotalPages(Math.ceil(data.length / pageLimit));
  }, [itemOffset, pageLimit, data]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageLimit) % data.length;

    setItemOffset(newOffset);
  };
  function Items({ currentData }) {
    return (
      <>
        {currentData &&
          currentData.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              fecha={item.fecha}
              monto={item.monto}
              cuenta={item.cuenta}
            />
          ))}
      </>
    );
  }

  return (
    <>
      <div id="container">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
        {currentData.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            fecha={item.fecha}
            monto={item.monto}
            cuenta={item.cuenta}
          />
        ))}
      </div>
    </>
  );
}

export default List;
