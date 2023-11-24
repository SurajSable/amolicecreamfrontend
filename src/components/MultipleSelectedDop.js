const MultiSelectDropdown = ({ showsubs, subOptions, values, setValues }) => {
  const handleSelectChange = (event) => {
    if (event.target.checked) {
      console.log(event.target.value)
      setValues({ ...values, subs: [...new Set([...values.subs, event.target.value])] })
    } else {
      setValues({ ...values, subs: values.subs.filter(id => id !== event.target.value) })
    }
  };

  return (<>
    <h5>Sub Categories</h5>
    {showsubs && <div className="mb-2 mt-2">
      {subOptions.length &&
        subOptions.map(s => <> <input
          type="checkbox"
          key={s._id}
          name={s.name}
          value={s._id}
          onChange={handleSelectChange}
        />
          <label key={s._id} htmlFor={s.name} className="me-2"> {s.name}</label></>)}
    </div>}
  </>
  );
};

export default MultiSelectDropdown;

