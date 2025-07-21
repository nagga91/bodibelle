import "./pagination.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate ,currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination' >
        {pageNumbers.map(number => (
          <li key={number} className='page-item' >
            <a href="#prods" onClick={() => paginate(number)} style={{color:currentPage===number?'blue':'black',borderColor:currentPage===number?'blue':'black'}} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;