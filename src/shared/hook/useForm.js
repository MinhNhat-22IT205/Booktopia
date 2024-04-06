import { useState, useCallback, useEffect } from "react";

const useForm = (initialInputs, validator) => {
  const [data, setData] = useState(initialInputs);
  const [errors, setErrors] = useState({});
  const [isValid, setisValid] = useState(false);
  const memoizedSetData = useCallback((name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);
  useEffect(() => {
    const delayer = setTimeout(() => {
      if (validator) {
        setErrors(validator(data));
      }
    }, 400);
    return () => {
      clearTimeout(delayer);
    };
  }, [data, validator]);
  useEffect(() => {
    if (JSON.stringify(errors) === JSON.stringify({})) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [errors]);
  return { data, memoizedSetData, errors, isValid };
};

export default useForm;
