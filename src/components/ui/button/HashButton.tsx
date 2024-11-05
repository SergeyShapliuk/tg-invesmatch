function HashButton({label, isSelected, onClick}: { label: string, isSelected: boolean, onClick: () => void }) {
    return (
        <button type="button" onClick={onClick} className="hashButton"
                style={{backgroundColor: isSelected ? "#286EF2" : undefined}}>
            #{label}
        </button>
    );
}

export default HashButton;
