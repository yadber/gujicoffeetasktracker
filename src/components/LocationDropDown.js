export default function LocationDropDown({task2, label, options, letter ,name, onChange,arrayOfallData,dropDownTitle}) {
  const ArrayOFLettersRow =[];
  const numberMegazen = Number(options);
  if(task2 === true){
    arrayOfallData.map(res => dropDownTitle?ArrayOFLettersRow.push(res.completeFiltering.cleanCoffee.location):ArrayOFLettersRow.push(res.fileNumber));
  }else{
    if(letter){
      for(let i=0; i< numberMegazen; i++){
          ArrayOFLettersRow.push(String.fromCharCode('A'.charCodeAt()+i));
      }
    }else{
      for(let i=1; i< numberMegazen+1; i++){
        ArrayOFLettersRow.push(i);
    }
    }
  }
  return (
    <div className='mb-2 w-52'>
    <select onChange={onChange} name={name} 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option defaultValue={label}>{label}</option>
        {ArrayOFLettersRow.map(value =>(
          <option  value={value} key={value}>{value}</option>
        ))}
    </select>
    </div>
  )
}