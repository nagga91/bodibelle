import "./descriptionBox.scss";

function DescriptionBox({icon, title,text, background}) {
  return (
    <div className="descriptionBox">
      <div className="icon" style={{ background: background }}>
    {icon}
      </div>
      <div className="text">
    <h2>
        {title}
    </h2>
    <p>{text}</p>

      </div>
    </div>
  );
} 

export default DescriptionBox;
