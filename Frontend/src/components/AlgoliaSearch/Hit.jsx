/* eslint-disable react/prop-types */
import { Highlight } from "react-instantsearch";

export const Hit = ({ hit }) => {
  return (
    <article className="border border-base-300 p-2 mb-2 rounded-lg">
      <img src={hit.backdrop_path} />
			<div className="hit-title">
			  <Highlight attribute="title" hit={hit} />
			</div>
			<div className="hit-overview">
			  <Highlight attribute="overview" hit={hit} />
			</div>
    </article>
  );
};