// Dữ liệu về các trò chơi
const games = [
    {
        name: "Ngọc rồng-Hồi sinh",
        image: "/img/hsnr.png",
        description: "nạp",
        link: "https://hoisinhngocrong.com" // Liên kết của trò chơi 1
    },
	
	  {
        name: " Ngọc rồng-Hades",
        image: "/img/hades.png",
        description: "cày chay",
        link: "https://nrohades.com/" // Liên kết của trò chơi 1
    },
	
	  {
        name: "Ngọc rồng -Infinity",
        image: "/img/nrin.png",
        description: "Cày-Nạp",
        link: "https://google.com/" // Liên kết của trò chơi 1
    },
	
	  {
        name: "Ngọc rồng - kame",
        image: "/img/logo.jpg",
        description: "Cay chay",
        link: "https://google.com/" // Liên kết của trò chơi 1
    },
	
	
	
	
    {
        name: "Game 2",
        image: "game2.jpg",
        description: "test.",
        link: "https://example.com/game2" // Liên kết của trò chơi 2
    },
    {
        name: "Game 3",
        image: "game3.jpg",
        description: "Cày chay.",
        link: "https://example.com/game3" // Liên kết của trò chơi 3
    },
	
	  {
        name: "Ngọc rồng - kame",
        image: "/img/logo.jpg",
        description: "Cay chay",
        link: "https://google.com/" // Liên kết của trò chơi 1
    },
	
	
    // Thêm các trò chơi khác tại đây...
];

const gamesPerPage = 6; // Số trò chơi hiển thị trên mỗi trang
let currentPage = 1; // Trang hiện tại

// Lấy thẻ chứa danh sách trò chơi từ ID của nó trong HTML
const appContainer = document.getElementById('appContainer');

// Hàm hiển thị các trò chơi trên trang
function displayGames(page) {
    appContainer.innerHTML = '';

    const startIndex = (page - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const displayedGames = games.slice(startIndex, endIndex);

    displayedGames.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');

        const imageElement = document.createElement('img');
        imageElement.src = game.image;
        
        // Tạo thẻ <a> bao bọc ảnh, chỉ bấm vào ảnh mới chuyển hướng đến liên kết của trò chơi
        const imageLink = document.createElement('a');
        imageLink.href = game.link;
        imageLink.setAttribute('target', '_blank');
        imageLink.appendChild(imageElement);
        gameElement.appendChild(imageLink);

        // Tạo các phần tử khác (tên, mô tả) không có chức năng chuyển hướng
        const nameElement = document.createElement('h2');
        nameElement.textContent = game.name;
        gameElement.appendChild(nameElement);

        const descriptionElement = document.createElement('b');
        descriptionElement.textContent = game.description;
        gameElement.appendChild(descriptionElement);

        appContainer.appendChild(gameElement);
    });
}


// Hàm thiết lập phân trang
function setupPagination() {
    const totalPages = Math.ceil(games.length / gamesPerPage); // Tính tổng số trang

    // Tạo container cho phân trang
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');

    // Tạo các nút trang và thêm sự kiện click cho mỗi nút
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('span');
        pageLink.classList.add('page-link');
        pageLink.textContent = i;

        // Thêm lớp active cho nút trang hiện tại
        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        // Thêm sự kiện click cho nút trang
        pageLink.addEventListener('click', () => {
            currentPage = i; // Cập nhật trang hiện tại
            displayGames(currentPage); // Hiển thị các trò chơi trên trang mới
            updatePagination(); // Cập nhật giao diện phân trang
        });

        // Thêm nút trang vào container phân trang
        paginationContainer.appendChild(pageLink);
    }

    // Thêm container phân trang vào body của trang
    document.body.appendChild(paginationContainer);
}

// Hàm cập nhật giao diện phân trang
function updatePagination() {
    const pageLinks = document.querySelectorAll('.page-link');
    pageLinks.forEach((link, index) => {
        if (index + 1 === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


// Hàm lọc trò chơi dựa trên loại
function filterGames(keyword) {
    const games = document.querySelectorAll('.game');

    games.forEach(game => {
        const description = game.querySelector('b').textContent.toLowerCase();

        if (description.includes(keyword.toLowerCase()) || keyword === 'all') {
            game.style.display = 'block'; // Hiển thị trò chơi nếu chứa từ khóa hoặc nút 'Tất cả' được chọn
        } else {
            game.style.display = 'none'; // Ẩn trò chơi nếu không chứa từ khóa
        }
    });
}

function toggleFilterOptions() {
    const filterButtons = document.getElementById('filterButtons');

    if (filterButtons.style.display === 'none') {
        filterButtons.style.display = 'block';
    } else {
        filterButtons.style.display = 'none';
    }
}
//


// Hiển thị trò chơi và thiết lập phân trang khi trang web được tải
displayGames(currentPage);
setupPagination();
