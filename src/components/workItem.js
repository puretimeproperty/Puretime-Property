import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const WorkItem = ({ image, title, description, ...props }) => {
  return (
    <div className={`flex basis-1/2 flex-col ${props.className}`}>
      <GatsbyImage image={image} alt={title} className="rounded-xl shadow-xl" />
      <div className="flex flex-col self-stretch pt-6">
        <h3 className="font-display text-display-md pb-4">{title}</h3>
        <p className="text-body-lg font-light text-neutral-700">
          {description}
        </p>
      </div>
    </div>
  );
};

WorkItem.propTypes = {
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default WorkItem;
