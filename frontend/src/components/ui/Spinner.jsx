export default function Spinner ({size = 20}){
    const s = {width:size,height: size,borderWidth:3};
    return (
        <span
            className="inline-block animate-spin rounded-full border-current border-t-transparent align-[-0.125em]"
            style={s}
            aria-label="Loading"
        />
    )
}