function createTitaniStore() {
    list_product = [];
    insert_product = [];
    id_product = 0;
    list_product.push({
        'product': ['Apel', 'Kangkung', 'Jeruk', 'Jengkol', 'Anggur', 'Durian Montong', 'Mangga', 'Salak Pondoh', 'Jambu', 'Belimbing', 'Buah Naga', 'Manggis'],
        'location': ['Malang', 'Jakarta', 'Tasikmalya', 'Bandung', 'Tasikmalya', 'Malang', 'Malang', 'Jakarta', 'Tasikmalya', 'Bandung', 'Tasikmalya', 'Tangerang', 'Bogor', 'Denpasar', 'Tasikmalaya'],
        'price': [25000, 2000, 20000, 18000, 27000, 50000, 10000, 6000, 5000, 17000, 24000, 23000],
        'image': ['046382000_1491031821-20170401-Apel', '092922700_1547523741-shutterstock_200569799', '058168400_1558099815-iStock-1058241246', '078407700_1564479270-iStock-941217460', '024056500_1481545022-centroone_com', '019966500_1541581867-Durian_1', '047936900_1552731027-foto_HL_mangga', '064756900_1494144012-Kemenpar_7_Mei__4__OK', '071323300_1574936975-jambu-fruits-219387_1280', '086460500_1556885614-belimbing', '088792400_1526618679-Atasi-Hipertensi-dengan-Buah-Naga-By-Bennyartist-shutterstock_326428622', '097800600_1563278409-iStock-465572969']
    });
    list_product.forEach((data) => {
        for (let i = 0; i < data.product.length; i++) {
            id_product++;
            insert_product.push({ 'id_product': id_product, 'product': data.product[i], 'location': data.location[i], 'price': data.price[i], 'image': data.image[i] });
            localStorage.setItem('list_product', JSON.stringify(insert_product));
            localStorage.setItem('id_product', id_product);
        }
    });
};

$(window).on('load', () => {
    if (!localStorage.list_product && !localStorage.id_product) {
        createTitaniStore();
    }
    loadTitaniStore();
    totalProductInCart();
});

function totalProductInCart() {
    if (localStorage.list_cart && localStorage.id_cart) {
        list_cart = JSON.parse(localStorage.getItem('list_cart'));
        if (list_cart.length > 0) {
            $('#productInCart').text(list_cart.length);
        } else {
            $('#productInCart').text(0);
        }
    } else {
        $('#productInCart').text(0);
    }
}

function loadTitaniStore() {
    if (localStorage.list_product && localStorage.id_product) {
        list_product = JSON.parse(localStorage.getItem('list_product'));
        let data_product = "";
        if (list_product.length > 0) {
            data_product += `
                <div class="row mb-3">
                    <div class="col-12">
                        <nav class="navbar navbar-expand-lg navbar-light" style="padding: 0;">
                            Hasil Bumi Petani Lokal <span class="text-black-50 ml-2">(${list_product.length} Produk)</span>
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item dropdown">
                                    Urut Berdasarkan: <a class="nav-link dropdown-toggle d-inline" href="#"
                                        id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">Produk
                                        Terbaru
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-sm-right" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#">Produk Terpopuler</a>
                                        <a class="dropdown-item" href="#">Rating Petani</a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="row" id="list-store">
            `;
            for (i in list_product) {
                data_product += `
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                    <div class="card shadow-sm">
                        <img src="assets/img/${list_product[i].image}.jpg" class="card-img-top"
                            alt="Click to Reload Images">
                        <div class="card-body">
                            <p class="card-title">${list_product[i].product}</p>
                            <p class="card-text text-titani big-text">Rp. ${list_product[i].price} <span class="small-text">per
                                    Kg</span>
                            </p>
                            <p class="card-text text-black-50 small-text mt-2"><i
                                    class="fa fa-map-marker-alt mr-1"></i>
                                ${list_product[i].location} & 45 kota lainnya</p>
                            <p class="card-text text-black-50 mt-2"><i class="fa fa-star"></i><i
                                    class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                    class="fa fa-star text-black-50"></i>
                                <span class="small-text text-black-50">(4163)</span>
                            </p>
                            <p class="card-text small-text mt-4"><span class="text-titani">50+
                                    penawaran</span> lain dimulai dari Rp. ${list_product[i].price + 250}</p>
                        </div>
                        <div class="card-footer border-top-0 bg-white">
                            <a href="javascript:void(0)" onclick="getProduct('${list_product[i].id_product}')" class="btn btn-titani" data-toggle="modal"
                                data-target="#addToCart" data-whatever="@mdo" style="width: 100%;">Tambahkan Ke
                                Keranjang</a>
                        </div>
                    </div>
                </div>
                `;
            }
            data_product += `</div>`;
        } else {
            data_product = `
                <div class="alert alert-secondary" role="alert">
                    Belum ada hasil bumi yang dijual para petani nih, maaf.
                </div>
            `;
        }
        breadcrumb = `
            <li class="breadcrumb-item"><a href="javascript:void(0);" onclick="loadTitaniStore();">Beranda</a></li>
            <li class="breadcrumb-item active" aria-current="page">Titani Store</li>
        `;
        $('#mainContent').html(data_product);
        $('#errorMessage').addClass('hidden');
        $('#breadcrumb').html(breadcrumb);
    }
}

function payment() {
    price = $('#price').val();
    qtyOrder = $('#qtyOrder').val();
    total = price * qtyOrder;
    $('#total').val(total);
}

$('#qtyOrder').keyup(payment);
$('#qtyOrder').change(payment);

function loadMyCart() {
    let data_cart = "";
    if (localStorage.list_cart && localStorage.id_cart) {
        list_cart = JSON.parse(localStorage.getItem('list_cart'));
        list_product = JSON.parse(localStorage.getItem('list_product'));
        var bill = 0;
        if (list_cart.length > 0) {
            data_cart += `
                <div class="row mb-3">
                    <div class="col-12">
                        <nav class="navbar navbar-expand-lg navbar-light" style="padding: 0;">
                            Daftar Keranjang <span class="text-black-50 ml-2">(${list_cart.length} Produk)</span>
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item dropdown">
                                    Urut Berdasarkan: <a class="nav-link dropdown-toggle d-inline" href="#"
                                        id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">Produk
                                        Terbaru
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-sm-right" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#">Produk Terpopuler</a>
                                        <a class="dropdown-item" href="#">Rating Petani</a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="row" id="list-store">
            `;
            for (cart in list_cart) {
                for (product in list_product) {
                    if (list_product[product].id_product == list_cart[cart].id_product) {
                        bill += parseInt(list_cart[cart].total);
                        data_cart += `
                        <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                            <div class="card shadow-sm">
                                <img src="assets/img/${list_product[product].image}.jpg" class="card-img-top"
                                    alt="Click to Reload Images">
                                <div class="card-body">
                                    <p class="card-title">${list_product[product].product}</p>
                                    <p class="card-text text-titani big-text">Rp. ${list_product[product].price} <span class="small-text">per
                                            Kg</span>
                                    </p>
                                    <p class="card-text text-black-50 small-text mt-2"><i
                                        class="fa fa-map-marker-alt mr-1"></i>
                                    ${list_product[product].location} & 45 kota lainnya</p>
                                    <p class="card-text text-black-50 mt-2"><i class="fa fa-star"></i><i
                                            class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                            class="fa fa-star text-black-50"></i>
                                        <span class="small-text text-black-50">(4163)</span>
                                    </p>
                                    <p class="card-text text-black-50 mt-2">Beli ${list_cart[cart].qtyOrder} Kg</p>
                                    <p class="card-text text-black-50 mt-2">Tagihan Rp. ${list_cart[cart].total}</p>
                                </div>
                                <div class="card-footer border-top-0 bg-white">
                                    <a href="javascript:void(0)" onclick="deleteProductInCart('${list_cart[cart].id_cart}');" class="btn btn-danger" data-toggle="modal")>Hapus</a>
                                    <a href="javascript:void(0)" onclick="checkoutBill('${list_cart[cart].id_cart}')" class="btn btn-titani" data-toggle="modal"
                                    data-target="#addToCart" data-whatever="@mdo")>Checkout</a>
                                </div>
                            </div>
                        </div>
                    `;
                    }
                }
            }
            data_cart += `
                </div>
                <div class="alert alert-info" role="alert">
                    Total tagihan Anda Rp. ${bill}
                </div>
            `;
        } else {
            data_cart = `
                <div class="alert alert-info" role="alert">
                    Keranjangmu masih kosong, klik <a href="javascript:void(0);" class="alert-link" onclick="loadTitaniStore();">Titani Store</a> untuk cari hasil bumi terbaik dari para pertani lokal.
                </div>
            `;
        }
        breadcrumb = `
            <li class="breadcrumb-item"><a href="javascript:void(0);" onclick="loadTitaniStore();">Beranda</a></li>
            <li class="breadcrumb-item active" aria-current="page">Keranjang Saya</li>
        `;
    } else {
        data_cart = `
            <div class="alert alert-info" role="alert">
                Keranjangmu masih kosong, klik <a href="javascript:void(0);" class="alert-link" onclick="loadTitaniStore();">Titani Store</a> untuk cari hasil bumi terbaik dari para pertani lokal.
            </div>
        `;
    }
    breadcrumb = `
        <li class="breadcrumb-item"><a href="javascript:void(0);" onclick="loadTitaniStore();">Beranda</a></li>
        <li class="breadcrumb-item active" aria-current="page">Keranjang Saya</li>
    `;
    $('#mainContent').html(data_cart);
    $('#errorMessage').addClass('hidden');
    $('#breadcrumb').html(breadcrumb);
}


function getProduct(id) {
    $('#messageShow').addClass('hidden');
    if (localStorage.list_product && localStorage.id_product) {
        list_product = JSON.parse(localStorage.getItem('list_product'));
        idx_product = 0;
        $('#groupPayment').addClass('hidden');
        for (i in list_product) {
            if (list_product[i].id_product == id) {
                $('#productLabel').text(list_product[i].product);
                $('#idProduct').val(list_product[i].id_product);
                $('#price').val(list_product[i].price);
                $('#qtyOrder').val('');
                $('#total').val(0);
                list_product.splice(idx_product, 1);
            }
            idx_product++;
        }
    }
}

function addToCart() {
    id_product = $('#idProduct').val();
    qtyOrder = $('#qtyOrder').val();
    total = $('#total').val();
    $('#messageShow').addClass('hidden');
    if (localStorage.list_cart && localStorage.id_cart) {
        list_cart = JSON.parse(localStorage.getItem('list_cart'));
        id_cart = parseInt(localStorage.getItem('id_cart'));
    } else {
        list_cart = [];
        id_cart = 0;
    }
    if (qtyOrder < 5) {
        errorMessage = `
        <div class="alert alert-danger" role="alert">
            Maaf, pembelian produk minimum adalah 5 Kg.
        </div>
        `;
        $('#messageShow').html(errorMessage);
        $('#messageShow').removeClass('hidden');
    } else {
        id_cart++;
        list_cart.push({ 'id_cart': id_cart, 'id_product': id_product, 'qtyOrder': qtyOrder, 'total': total });
        localStorage.setItem('list_cart', JSON.stringify(list_cart));
        localStorage.setItem('id_cart', id_cart);
        succesMessage = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            Produk berhasil ditambah ke dalam keranjang Anda.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        $('#qtyOrder').val('');
        $('#total').val(0);
        $('#messageShow').html(succesMessage);
        totalProductInCart();
        $('#messageShow').removeClass('hidden');
    }
}

function deleteProductInCart(id_cart) {
    if (localStorage.list_cart && localStorage.id_cart) {
        list_cart = JSON.parse(localStorage.getItem('list_cart'));
        idx_cart = 0;
        for (cart in list_cart) {
            if (list_cart[cart].id_cart == id_cart) {
                list_cart.splice(idx_cart, 1);
            }
            idx_cart++;
        }

        localStorage.setItem('list_cart', JSON.stringify(list_cart));
        loadMyCart();
        totalProductInCart();
    }
}

function checkoutBill(id_cart) {
    $('#messageShow').addClass('hidden');
    if (localStorage.list_cart && localStorage.id_cart) {
        list_cart = JSON.parse(localStorage.getItem('list_cart'));
        list_product = JSON.parse(localStorage.getItem('list_product'));
        idx_cart = 0;
        $('#groupPayment').removeClass('hidden');
        $('#payment').val('');
        for (cart in list_cart) {
            if (list_cart[cart].id_cart == id_cart) {
                $('#total').val(list_cart[cart].total);
                $('#qtyOrder').val(list_cart[cart].qtyOrder);
                for (product in list_product) {
                    if (list_product[product].id_product = list_cart[cart].id_product) {
                        $('#price').val(list_product[product].price);
                        $('#productLabel').text(list_product[product].product);
                    }
                }
            }
        }
    }
}