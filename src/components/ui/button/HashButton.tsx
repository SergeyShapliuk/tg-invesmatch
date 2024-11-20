function HashButton({label, isSelected, onClick}: { label: string, isSelected: boolean, onClick: () => void }) {
    return (
        <button type="button" onClick={onClick} className="hashButton"
                style={{backgroundColor: isSelected ? "#0062FF" : undefined}}>
            {label}
        </button>
    );
}

export default HashButton;
