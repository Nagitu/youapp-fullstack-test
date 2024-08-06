
type editFormProps = {
    label:string;
    value?:any;
    disabled?: boolean;
} 

const EditForm:React.FC<editFormProps> = ({label,value,disabled}) => {
  return (
    <div className='flex justify-between items-center'>
        <span className='text-white opacity-30'>{label}:</span>
        <input className='h-[36px] w-[60%] rounded-lg border-[#FFFFFF38] bg-gray-800 text-white p-2 ' placeholder={value} disabled={disabled}  ></input>
    </div>
  )
}

export default EditForm