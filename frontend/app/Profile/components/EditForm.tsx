
type editFormProps = {
    label:string;
    value?:any;
    disabled?: boolean;
    type?:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 

const EditForm:React.FC<editFormProps> = ({label,value,disabled,type,onChange}) => {
  return (
    <div className='flex justify-between items-center'>
        <span className='text-white opacity-30'>{label}:</span>
        <input className='h-[36px] w-[60%] rounded-lg border-[#FFFFFF38] bg-gray-800 text-white p-2 ' onChange={onChange} type={type} placeholder={value} disabled={disabled}  ></input>
    </div>
  )
}

export default EditForm