import "../css/pagination.css";
const Pagination = () => {
  return (
    <div className="pagination">
      <button className="pagenationButton">Previous</button>
      <span className="pagenationNumber">1</span>
      <button className="pagenationButton">Next</button>
    </div>
  )
}

export default Pagination
