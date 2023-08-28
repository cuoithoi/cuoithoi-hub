export const RadioButton = (props) => {
    const { onChange, id, isSelected, label, value, name } = props;
    return (
      <div className="RadioButton customize_radio">
        <input
          id={id}
          onChange={onChange}
          value={value}
          type="radio"
          checked={isSelected}
          name={name}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };
  