const FormCheckbox = ({ label, name, defaultValue, size }) => {
    return (
      <div className='form-control items-center m-2'>
        <label htmlFor={name} className='label cursor-pointer'>
          <span className='label-text uppercase text-xs'>{label}</span>
        </label>
        <input
          type='checkbox'
          name={name}
          defaultChecked={false}
          className={`checkbox checkbox-primary ${size}`}
        />
      </div>
    );
  };
  export default FormCheckbox;
  