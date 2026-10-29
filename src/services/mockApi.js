const usuarios = [
  {
    id: 1,
    nombre: 'María López',
    usuario: 'maria',
    password: '123456',
  },
];

const productosMock = [
  { id: 1, nombre: 'Laptop Lenovo IdeaPad Slim 3', categoria: 'Laptops', precio: 1899.90, imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=640&q=80' },
  { id: 2, nombre: 'Laptop ASUS Vivobook 15', categoria: 'Laptops', precio: 2299.00, imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=640&q=80' },
  { id: 3, nombre: 'Laptop HP Pavilion 14', categoria: 'Laptops', precio: 2799.90, imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=640&q=80' },
  { id: 4, nombre: 'Laptop gamer Acer Nitro 5', categoria: 'Laptops', precio: 4299.00, imagen: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=640&q=80' },
  { id: 5, nombre: 'Laptop Dell Inspiron 15', categoria: 'Laptops', precio: 3199.90, imagen: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=640&q=80' },
  { id: 6, nombre: 'MacBook Air 13 pulgadas', categoria: 'Laptops', precio: 5299.00, imagen: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=640&q=80' },
  { id: 7, nombre: 'Laptop MSI Thin 15', categoria: 'Laptops', precio: 3899.90, imagen: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=640&q=80' },
  { id: 8, nombre: 'Laptop Huawei MateBook D16', categoria: 'Laptops', precio: 3499.00, imagen: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=640&q=80' },
  { id: 9, nombre: 'SSD NVMe Samsung 990 EVO 1 TB', categoria: 'Almacenamiento', precio: 389.90, imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=640&q=80' },
  { id: 10, nombre: 'SSD Kingston NV2 500 GB', categoria: 'Almacenamiento', precio: 189.00, imagen: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=640&q=80' },
  { id: 11, nombre: 'SSD SATA Crucial MX500 1 TB', categoria: 'Almacenamiento', precio: 329.90, imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=640&q=80' },
  { id: 12, nombre: 'Disco duro HDD Seagate 2 TB', categoria: 'Almacenamiento', precio: 279.00, imagen: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=640&q=80' },
  { id: 13, nombre: 'Disco duro externo WD Elements 1 TB', categoria: 'Almacenamiento', precio: 239.90, imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=640&q=80' },
  { id: 14, nombre: 'SSD externo SanDisk Portable 1 TB', categoria: 'Almacenamiento', precio: 399.00, imagen: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=640&q=80' },
  { id: 15, nombre: 'Memoria USB Kingston DataTraveler 128 GB', categoria: 'Almacenamiento', precio: 39.90, imagen: 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=640&q=80' },
  { id: 16, nombre: 'Tarjeta microSD SanDisk 256 GB', categoria: 'Almacenamiento', precio: 79.00, imagen: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=640&q=80' },
  { id: 17, nombre: 'Procesador AMD Ryzen 5 5600', categoria: 'Componentes', precio: 599.90, imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80' },
  { id: 18, nombre: 'Procesador Intel Core i5-14400F', categoria: 'Componentes', precio: 899.00, imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=640&q=80' },
  { id: 19, nombre: 'Tarjeta gráfica NVIDIA GeForce RTX 4060', categoria: 'Componentes', precio: 1699.90, imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=640&q=80' },
  { id: 20, nombre: 'Tarjeta de vídeo AMD Radeon RX 7600', categoria: 'Componentes', precio: 1499.00, imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=640&q=80' },
  { id: 21, nombre: 'Placa madre ASUS Prime B550M-A', categoria: 'Componentes', precio: 499.90, imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80' },
  { id: 22, nombre: 'Placa madre MSI PRO B760M-P', categoria: 'Componentes', precio: 579.00, imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=640&q=80' },
  { id: 23, nombre: 'Fuente de poder Corsair 650 W 80 Plus Bronze', categoria: 'Componentes', precio: 349.90, imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=640&q=80' },
  { id: 24, nombre: 'Gabinete gamer con panel de vidrio', categoria: 'Componentes', precio: 329.00, imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=640&q=80' },
  { id: 25, nombre: 'Tarjeta gráfica NVIDIA GeForce RTX 4070 SUPER', categoria: 'Componentes', precio: 2999.90, imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=640&q=80' },
  { id: 26, nombre: 'Procesador AMD Ryzen 7 7800X3D', categoria: 'Componentes', precio: 1899.00, imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80' },
  { id: 27, nombre: 'Memoria RAM DDR4 Corsair Vengeance 16 GB', categoria: 'Memorias RAM', precio: 159.90, imagen: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=640&q=80' },
  { id: 28, nombre: 'Memoria RAM DDR4 Kingston Fury 32 GB', categoria: 'Memorias RAM', precio: 289.00, imagen: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=640&q=80' },
  { id: 29, nombre: 'Memoria RAM DDR5 Corsair Vengeance 32 GB', categoria: 'Memorias RAM', precio: 429.90, imagen: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=640&q=80' },
  { id: 30, nombre: 'Memoria RAM para laptop Crucial 16 GB', categoria: 'Memorias RAM', precio: 179.00, imagen: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=640&q=80' },
  { id: 31, nombre: 'Monitor LG UltraGear 24 pulgadas 144 Hz', categoria: 'Monitores', precio: 799.90, imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=640&q=80' },
  { id: 32, nombre: 'Monitor Samsung 27 pulgadas QHD', categoria: 'Monitores', precio: 1199.00, imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=640&q=80' },
  { id: 33, nombre: 'Monitor ASUS TUF Gaming 27 pulgadas', categoria: 'Monitores', precio: 1399.90, imagen: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=640&q=80' },
  { id: 34, nombre: 'Monitor Dell 24 pulgadas Full HD', categoria: 'Monitores', precio: 649.00, imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=640&q=80' },
  { id: 35, nombre: 'Monitor Xiaomi 34 pulgadas ultrawide', categoria: 'Monitores', precio: 1799.90, imagen: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=640&q=80' },
  { id: 36, nombre: 'Teclado mecánico Logitech G413', categoria: 'Periféricos', precio: 299.90, imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=640&q=80' },
  { id: 37, nombre: 'Teclado inalámbrico Logitech K380', categoria: 'Periféricos', precio: 159.00, imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=640&q=80' },
  { id: 38, nombre: 'Mouse gamer Logitech G502 HERO', categoria: 'Periféricos', precio: 219.90, imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=640&q=80' },
  { id: 39, nombre: 'Mouse inalámbrico Logitech M185', categoria: 'Periféricos', precio: 49.00, imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=640&q=80' },
  { id: 40, nombre: 'Audífonos gamer HyperX Cloud Stinger', categoria: 'Periféricos', precio: 199.90, imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=640&q=80' },
  { id: 41, nombre: 'Webcam Logitech C920 Full HD', categoria: 'Periféricos', precio: 329.00, imagen: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=640&q=80' },
  { id: 42, nombre: 'Parlantes Logitech Z150', categoria: 'Periféricos', precio: 109.90, imagen: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=640&q=80' },
  { id: 43, nombre: 'Parlante Bluetooth JBL Flip 6', categoria: 'Periféricos', precio: 499.00, imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=640&q=80' },
  { id: 44, nombre: 'Micrófono USB para streaming', categoria: 'Periféricos', precio: 279.90, imagen: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=640&q=80' },
  { id: 45, nombre: 'Mousepad gamer extendido', categoria: 'Periféricos', precio: 69.00, imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=640&q=80' },
  { id: 46, nombre: 'Base ventiladora para laptop de 15.6 pulgadas', categoria: 'Refrigeración', precio: 99.90, imagen: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=640&q=80' },
  { id: 47, nombre: 'Cooler para procesador DeepCool AK400', categoria: 'Refrigeración', precio: 179.00, imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=640&q=80' },
  { id: 48, nombre: 'Ventilador ARGB para gabinete 120 mm', categoria: 'Refrigeración', precio: 59.90, imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=640&q=80' },
  { id: 49, nombre: 'Hub USB-C de 7 puertos', categoria: 'Accesorios', precio: 139.00, imagen: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=640&q=80' },
  { id: 50, nombre: 'Soporte ajustable de aluminio para laptop', categoria: 'Accesorios', precio: 119.90, imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=640&q=80' },
  { id: 51, nombre: 'Laptop Lenovo ThinkPad E14', categoria: 'Laptops', precio: 3699.90, imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=640&q=80' },
  { id: 52, nombre: 'Laptop ASUS TUF Gaming A15', categoria: 'Laptops', precio: 4599.00, imagen: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=640&q=80' },
  { id: 53, nombre: 'Laptop HP 15-fc Ryzen 7', categoria: 'Laptops', precio: 3299.90, imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=640&q=80' },
  { id: 54, nombre: 'Laptop Acer Aspire 5', categoria: 'Laptops', precio: 2499.00, imagen: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=640&q=80' },
  { id: 55, nombre: 'Laptop gamer Lenovo LOQ 15', categoria: 'Laptops', precio: 5199.90, imagen: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=640&q=80' },
  { id: 56, nombre: 'Laptop Apple MacBook Pro 14', categoria: 'Laptops', precio: 8999.00, imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=640&q=80' },
  { id: 57, nombre: 'SSD NVMe WD Black SN850X 2 TB', categoria: 'Almacenamiento', precio: 749.90, imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=640&q=80' },
  { id: 58, nombre: 'SSD Crucial P3 Plus 2 TB', categoria: 'Almacenamiento', precio: 619.00, imagen: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=640&q=80' },
  { id: 59, nombre: 'Disco duro HDD Seagate Barracuda 4 TB', categoria: 'Almacenamiento', precio: 459.90, imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=640&q=80' },
  { id: 60, nombre: 'Disco duro externo Toshiba Canvio 2 TB', categoria: 'Almacenamiento', precio: 329.00, imagen: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=640&q=80' },
  { id: 61, nombre: 'SSD externo Samsung T7 Shield 1 TB', categoria: 'Almacenamiento', precio: 549.90, imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=640&q=80' },
  { id: 62, nombre: 'Memoria USB SanDisk Ultra Flair 256 GB', categoria: 'Almacenamiento', precio: 69.00, imagen: 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=640&q=80' },
  { id: 63, nombre: 'Tarjeta microSD Samsung EVO Plus 512 GB', categoria: 'Almacenamiento', precio: 149.90, imagen: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=640&q=80' },
  { id: 64, nombre: 'Procesador Intel Core i7-14700K', categoria: 'Componentes', precio: 2199.00, imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80' },
  { id: 65, nombre: 'Procesador AMD Ryzen 9 7900X', categoria: 'Componentes', precio: 1999.90, imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=640&q=80' },
  { id: 66, nombre: 'Tarjeta gráfica NVIDIA GeForce RTX 4080 SUPER', categoria: 'Componentes', precio: 4999.00, imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=640&q=80' },
  { id: 67, nombre: 'Tarjeta gráfica AMD Radeon RX 7800 XT', categoria: 'Componentes', precio: 2599.90, imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=640&q=80' },
  { id: 68, nombre: 'Placa madre Gigabyte B650 AORUS Elite AX', categoria: 'Componentes', precio: 1099.00, imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80' },
  { id: 69, nombre: 'Placa madre ASUS ROG Strix Z790-F', categoria: 'Componentes', precio: 1899.90, imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=640&q=80' },
  { id: 70, nombre: 'Fuente de poder EVGA 750 W 80 Plus Gold', categoria: 'Componentes', precio: 599.00, imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=640&q=80' },
  { id: 71, nombre: 'Gabinete gamer NZXT H5 Flow', categoria: 'Componentes', precio: 499.90, imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=640&q=80' },
  { id: 72, nombre: 'Tarjeta gráfica NVIDIA GeForce RTX 4060 Ti', categoria: 'Componentes', precio: 2199.00, imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=640&q=80' },
  { id: 73, nombre: 'Memoria RAM DDR5 G.Skill Ripjaws S5 32 GB', categoria: 'Memorias RAM', precio: 499.90, imagen: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=640&q=80' },
  { id: 74, nombre: 'Memoria RAM DDR5 Kingston Fury Beast 64 GB', categoria: 'Memorias RAM', precio: 899.00, imagen: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=640&q=80' },
  { id: 75, nombre: 'Memoria RAM DDR4 TeamGroup T-Force 32 GB', categoria: 'Memorias RAM', precio: 269.90, imagen: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=640&q=80' },
  { id: 76, nombre: 'Memoria RAM para laptop DDR5 Crucial 32 GB', categoria: 'Memorias RAM', precio: 349.00, imagen: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=640&q=80' },
  { id: 77, nombre: 'Monitor AOC 24 pulgadas 165 Hz', categoria: 'Monitores', precio: 899.90, imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=640&q=80' },
  { id: 78, nombre: 'Monitor BenQ 27 pulgadas 4K', categoria: 'Monitores', precio: 1899.00, imagen: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=640&q=80' },
  { id: 79, nombre: 'Monitor gamer Acer Nitro 27 pulgadas 180 Hz', categoria: 'Monitores', precio: 1499.90, imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=640&q=80' },
  { id: 80, nombre: 'Monitor portátil ASUS ZenScreen 15.6 pulgadas', categoria: 'Monitores', precio: 1099.00, imagen: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=640&q=80' },
  { id: 81, nombre: 'Teclado mecánico inalámbrico Keychron K8', categoria: 'Periféricos', precio: 429.90, imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=640&q=80' },
  { id: 82, nombre: 'Teclado gamer Redragon Kumara RGB', categoria: 'Periféricos', precio: 189.00, imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=640&q=80' },
  { id: 83, nombre: 'Mouse gamer inalámbrico Razer Basilisk V3 Pro', categoria: 'Periféricos', precio: 699.90, imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=640&q=80' },
  { id: 84, nombre: 'Mouse ergonómico Logitech Lift', categoria: 'Periféricos', precio: 349.00, imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=640&q=80' },
  { id: 85, nombre: 'Audífonos inalámbricos Sony WH-1000XM5', categoria: 'Periféricos', precio: 1399.90, imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=640&q=80' },
  { id: 86, nombre: 'Webcam Razer Kiyo X Full HD', categoria: 'Periféricos', precio: 349.00, imagen: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=640&q=80' },
  { id: 87, nombre: 'Parlantes Edifier R1280DB Bluetooth', categoria: 'Periféricos', precio: 699.90, imagen: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=640&q=80' },
  { id: 88, nombre: 'Parlante inteligente Amazon Echo Dot', categoria: 'Periféricos', precio: 229.00, imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=640&q=80' },
  { id: 89, nombre: 'Micrófono condensador Blue Yeti USB', categoria: 'Periféricos', precio: 599.90, imagen: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=640&q=80' },
  { id: 90, nombre: 'Control inalámbrico Xbox Series', categoria: 'Periféricos', precio: 329.00, imagen: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=640&q=80' },
  { id: 91, nombre: 'Base ventiladora gamer para laptop RGB', categoria: 'Refrigeración', precio: 149.90, imagen: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=640&q=80' },
  { id: 92, nombre: 'Refrigeración líquida Cooler Master 240 mm', categoria: 'Refrigeración', precio: 499.00, imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=640&q=80' },
  { id: 93, nombre: 'Cooler para procesador Noctua NH-U12S', categoria: 'Refrigeración', precio: 429.90, imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=640&q=80' },
  { id: 94, nombre: 'Kit de 3 ventiladores ARGB 120 mm', categoria: 'Refrigeración', precio: 169.00, imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=640&q=80' },
  { id: 95, nombre: 'Adaptador USB-C a HDMI 4K', categoria: 'Accesorios', precio: 79.90, imagen: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=640&q=80' },
  { id: 96, nombre: 'Docking station USB-C con doble HDMI', categoria: 'Accesorios', precio: 299.00, imagen: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=640&q=80' },
  { id: 97, nombre: 'Cargador USB-C GaN de 100 W', categoria: 'Accesorios', precio: 189.90, imagen: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=640&q=80' },
  { id: 98, nombre: 'Cable DisplayPort 1.4 de 2 metros', categoria: 'Accesorios', precio: 49.00, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=640&q=80' },
  { id: 99, nombre: 'Mochila para laptop de 15.6 pulgadas', categoria: 'Accesorios', precio: 159.90, imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=640&q=80' },
  { id: 100, nombre: 'Regleta protectora contra sobretensiones', categoria: 'Accesorios', precio: 89.00, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=640&q=80' },
];

const esperar = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function obtenerProductos() {
  await esperar();
  return {
    success: true,
    data: productosMock,
  };
}

export async function loginUsuario({ usuario, password }) {
  await esperar();
  const usuarioEncontrado = usuarios.find(
    (item) => item.usuario === usuario && item.password === password,
  );

  if (!usuarioEncontrado) {
    return {
      success: false,
      message: 'Usuario o contraseña incorrectos.',
    };
  }

  return {
    success: true,
    data: {
      token: 'mock-token-123',
      usuario: {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        usuario: usuarioEncontrado.usuario,
      },
    },
  };
}

export async function registrarUsuario({ nombre, usuario, password }) {
  await esperar();

  if (!nombre.trim() || !usuario.trim() || !password.trim()) {
    return {
      success: false,
      message: 'Completa todos los campos para continuar.',
    };
  }

  const yaExiste = usuarios.some((item) => item.usuario === usuario);

  if (yaExiste) {
    return {
      success: false,
      message: 'Ese usuario ya existe. Prueba otro nombre de usuario.',
    };
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre.trim(),
    usuario: usuario.trim(),
    password: password.trim(),
  };

  usuarios.push(nuevoUsuario);

  return {
    success: true,
    data: {
      token: `mock-token-${nuevoUsuario.id}`,
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        usuario: nuevoUsuario.usuario,
      },
    },
  };
}
