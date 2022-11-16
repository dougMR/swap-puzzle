let selectedPiece = null;

// This is correct order
const puzzleImagesProperOrder = [
    "piece-0.jpg",
    "piece-1.jpg",
    "piece-2.jpg",
    "piece-3.jpg",
    "piece-4.jpg",
    "piece-5.jpg",
    "piece-6.jpg",
    "piece-7.jpg",
    "piece-8.jpg",
];
// This holds the current order
const puzzleImages = [
    "piece-0.jpg",
    "piece-1.jpg",
    "piece-2.jpg",
    "piece-3.jpg",
    "piece-4.jpg",
    "piece-5.jpg",
    "piece-6.jpg",
    "piece-7.jpg",
    "piece-8.jpg",
];
// This will keep track of the html elements in the puzzle grid
const slots = [];

const shufflePieces = () => {
    const num = puzzleImages.length;
    for (let n = 0; n < num; n++) {
        let indexA = Math.floor(Math.random() * puzzleImages.length);
        let indexB;
        do {
            indexB = Math.floor(Math.random() * puzzleImages.length);
        } while (indexB === indexA);
        // swap using destructuring
        // [puzzleImages[indexA], puzzleImages[indexB]] = [
        //     puzzleImages[indexB],
        //     puzzleImages[indexA],
        // ];
        const temp = puzzleImages[indexA];
        puzzleImages[indexA] = puzzleImages[indexB];
        puzzleImages[indexB] = temp;
    }
};

const checkPuzzleSolved = () => {
    let solved = true;
    // check each slot
    for (
        let imageIndex = 0;
        imageIndex < slots.length;
        imageIndex++
    ) {
        let match = false;
        if (puzzleImages[imageIndex] === puzzleImagesProperOrder[imageIndex]) {
            // highlight it
            slots[imageIndex].classList.add("correct");
            match = true;
            console.log("match");
        } else {
            slots[imageIndex].classList.remove("correct");
            solved = false;
        }
    }
    if(solved){
        // PUZZLE SOLVED !
        document.getElementById("puzzle-holder").classList.add("solved");
    } else {
        document.getElementById("puzzle-holder").classList.remove("solved");
    }
};

const drawPuzzle = () => {
    // show images in the order of puzzleImages array
    for (let pieceIndex = 0; pieceIndex < slots.length; pieceIndex++) {
        const piece = slots[pieceIndex];
        const image = piece.querySelector("img");
        image.src = "./images/" + puzzleImages[pieceIndex];
    }
};

const swapPieces = (index0, index1) => {
    const temp = puzzleImages[index0];
    puzzleImages[index0] = puzzleImages[index1];
    puzzleImages[index1] = temp;
};

// swap array elements with destructuring
// const swapPieces = (index1, index2) => {
//     [puzzleImages[index1], puzzleImages[index2]] = [
//         puzzleImages[index2],
//         puzzleImages[index1],
//     ];
// };

const selectPiece = (event) => {
    // if no piece selected, select this piece
    // otherwise, deselect selected piece and swap pieces
    if (selectedPiece) {
        // selecting 2nd piece of pair
        selectedPiece.classList.remove("selected");
        swapPieces(
            selectedPiece.getAttribute("data-index"),
            event.target.getAttribute("data-index")
        );
        selectedPiece = null;
        drawPuzzle();
        checkPuzzleSolved();
    } else {
        // selecting first piece of pair
        selectedPiece = event.target;
        selectedPiece.classList.add("selected");
    }
};

const buildPuzzle = () => {
    // Create the html elements to serve as puzzle pieces
    const puzzle = document.getElementById("puzzle-holder");
    for (
        let imageNum = 0;
        imageNum < puzzleImagesProperOrder.length;
        imageNum++
    ) {
        const image = puzzleImagesProperOrder[imageNum];
        const pieceDiv = buildPieceElement(image);
        // use "data-index" to keep track of this element's index in the slots array
        pieceDiv.setAttribute("data-index", imageNum);
        pieceDiv.addEventListener("pointerdown", selectPiece);
        // add the piece to the puzzle
        puzzle.appendChild(pieceDiv);
        slots.push(pieceDiv);
    }
};
const buildPieceElement = (imgName) => {
    const image = document.createElement("img");
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.appendChild(image);
    return piece;
};

buildPuzzle();
shufflePieces();
drawPuzzle();
checkPuzzleSolved();