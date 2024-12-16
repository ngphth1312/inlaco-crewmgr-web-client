export const mockCrewMemberInfos = [
  {
    id: "CM-202401",
    fullName: "Nguyễn Văn A",
    dob: "01/12/1999",
    phoneNumber: "0823451242",
    position: {
      id: "1",
      name: "Thuyền trưởng",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "16 năm",
  },
  {
    id: "CM-202402",
    fullName: "Trần Võ Sơn B",
    dob: "01/12/2003",
    phoneNumber: "0866627731",
    position: {
      id: "2",
      name: "Thuyền phó nhất",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "10 năm",
  },
  {
    id: "CM-202403",
    fullName: "Nguyễn Phú C",
    dob: "13/12/2003",
    phoneNumber: "0865474654",
    position: {
      id: "3",
      name: "Thuyền phó 2",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "10 năm",
  },
  {
    id: "CM-202404",
    fullName: "Lê Đoàn Tấn D",
    dob: "15/10/2003",
    phoneNumber: "0884558386",
    position: {
      id: "4",
      name: "Thủy thủ trưởng",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "5 năm",
  },
  {
    id: "CM-202405",
    fullName: "Lê Văn E",
    dob: "03/04/2003",
    phoneNumber: "0823948112",
    position: {
      id: "4",
      name: "Thủy thủ lái",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "3 năm",
  },
  {
    id: "CM-202406",
    fullName: "Trần Tuấn F",
    dob: "23/01/2003",
    phoneNumber: "0822334112",
    position: {
      id: "5",
      name: "Thủy thủ lái",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "2 năm",
  },
  {
    id: "CM-202407",
    fullName: "Nguyễn Thị H",
    dob: "02/03/2001",
    phoneNumber: "0666777627",
    position: {
      id: "6",
      name: "Bếp",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "1 năm",
  },
  {
    id: "CM-202408",
    fullName: "Lê Thị K",
    dob: "03/11/2000",
    phoneNumber: "0865546665",
    position: {
      id: "7",
      name: "Sỹ quan máy",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "3 năm",
  },
  {
    id: "CM-202409",
    fullName: "Nguyễn Thị N",
    dob: "12/11/1996",
    phoneNumber: "0823451242",
    position: {
      id: "8",
      name: "Thợ máy",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "2 năm",
  },
  {
    id: "CM-202410",
    fullName: "Trần Văn M",
    dob: "01/12/1999",
    phoneNumber: "0823451242",
    position: {
      id: "8",
      name: "Thợ máy",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "Ít hơn 1 năm",
  },
  {
    id: "CM-202411",
    fullName: "Nguyễn Văn K",
    dob: "01/05/1998",
    phoneNumber: "0499958823",
    position: {
      id: "9",
      name: "Phục vụ viên",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "2 năm",
  },
  {
    id: "CM-202412",
    fullName: "Huỳnh Văn L",
    dob: "30/03/1999",
    phoneNumber: "0322351928",
    position: {
      id: "10",
      name: "Thợ điện",
      description: "Mô tả chức vụ trên tàu",
    },
    workExp: "1 năm",
  },
];

export const masterAssignmentSchedule = [
  {
    id: "MA-202401",
    partnerName: "CÔNG TY TNHH KỸ THUẬT HÀNG HẢI SÀI GÒN CỬU LONG",
    shipInfo: {
      id: "SH-01",
      IMONumber: "9538335",
      name: "RUI NING 7",
      countryCode: "CN",
      type: "Tàu hàng",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/3423988.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-07 18:36 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-12 07:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "VN SGN", //departureLocation
    endLocation: "ID MUB", //arrivalLocation
  },
  {
    id: "MA-202402",
    partnerName: "VIETNAM SHIPCHANDLER AND REPAIR WORKSHOP",
    shipInfo: {
      id: "SH-02",
      IMONumber: "9835056",
      name: "ENDEAVOUR II",
      countryCode: "SG",
      type: "Tàu dầu",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/5192604.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-02 18:36 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 12:49 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "ID MUB", //departureLocation
    endLocation: "VN CMT", //arrivalLocation
  },
  {
    id: "MA-202403",
    partnerName: "CÔNG TY TNHH KỸ THUẬT QMI",
    shipInfo: {
      id: "SH-03",
      IMONumber: "9426946",
      name: "PVT MERCURY",
      countryCode: "VN",
      type: "Tàu chở dầu thô",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/1837842.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-11-19 13:58 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 15:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "VN CLI", //departureLocation
    endLocation: "SG SIN", //arrivalLocation
  },
  {
    id: "MA-202404",
    partnerName: "CÔNG TY TNHH ĐẠI LÝ VẬN TẢI HIGH SEA",
    shipInfo: {
      id: "SH-04",
      IMONumber: "9187904",
      name: "SC HONGKONG",
      countryCode: "HK",
      type: "Tàu chở dầu thô - Loại hàng nguy hiểm B",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/593008.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-06 04:59 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 01:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "MY KUA", //departureLocation
    endLocation: "VN DNA", //arrivalLocation
  },
  {
    id: "MA-202405",
    partnerName: "CÔNG TY CỔ PHẦN SỬA CHỮA TÀU VÀ DỊCH VỤ LẶN BIG SEA",
    shipInfo: {
      id: "SH-05",
      IMONumber: "9406271",
      name: "DANUM 173",
      countryCode: "MY",
      type: "Tàu hàng",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/3413680.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-05 21:52 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 18:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "CN QZH", //departureLocation
    endLocation: "VN SGN", //arrivalLocation
  },
  {
    id: "MA-202406",
    partnerName: "CÔNG TY TNHH KỸ THUẬT TÀU VÀ DỊCH VỤ HÀNG HẢI NICE SEA",
    shipInfo: {
      id: "SH-06",
      IMONumber: "9146780",
      name: "MORNING VINAFCO",
      countryCode: "VN",
      type: "Tàu hàng",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/370804.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-07 00:09 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 22:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "VN DAD", //departureLocation
    endLocation: "VN SGN", //arrivalLocation
  },
];

export const mockCrewContracts = [
  {
    id: "CCT-202401",
    parties: {
      name: "Nguyễn Văn A",
    },
    title: "HỢP ĐỒNG LAO ĐỘNG 01",
    activationDate: "10/12/2024",
    expiredDate: "09/12/2025",
  },
  {
    id: "CCT-202402",
    parties: {
      name: "Nguyễn Phú B",
    },
    title: "HỢP ĐỒNG LAO ĐỘNG 02",
    activationDate: "13/12/2024",
    expiredDate: "12/12/2025",
  },
  {
    id: "CCT-202403",
    parties: {
      name: "Trần Võ Sơn C",
    },
    title: "HỢP ĐỒNG LAO ĐỘNG 03",
    activationDate: "02/03/2024",
    expiredDate: "01/03/2026",
  },
  {
    id: "CCT-202404",
    parties: {
      name: "Nguyễn Thị D",
    },
    title: "HỢP ĐỒNG LAO ĐỘNG 04",
    activationDate: "08/10/2024",
    expiredDate: "08/10/2027",
  },
  {
    id: "CCT-202405",
    parties: {
      name: "Nguyễn Văn Quốc E",
    },
    title: "HỢP ĐỒNG LAO ĐỘNG 05",
    activationDate: "26/08/2024",
    expiredDate: "25/02/2025",
  },
  {
    id: "CCT-202406",
    parties: {
      name: "Trần Văn F",
    },
    title: "HỢP ĐỒNG LAO ĐỘNG 06",
    activationDate: "22/12/2024",
    expiredDate: "21/06/2025",
  },
];

export const mockSupplyContracts = [
  {
    id: "SCT-202401",
    parties: {
      name: "CÔNG TY TNHH KỸ THUẬT HÀNG HẢI SÀI GÒN CỬU LONG",
      represent: "Nguyễn Văn A",
    },
    title: "HỢP ĐỒNG CUNG ỨNG LAO ĐỘNG 01",
    activationDate: "20/12/2024",
    expiredDate: "19/02/2025",
  },
  {
    id: "SCT-202402",
    parties: {
      name: "VIETNAM SHIPCHANDLER AND REPAIR WORKSHOP",
      represent: "Nguyễn Phú B",
    },
    title: "HỢP ĐỒNG CUNG ỨNG LAO ĐỘNG 02",
    activationDate: "13/10/2024",
    expiredDate: "12/01/2025",
  },
  {
    id: "SCT-202403",
    parties: {
      name: "CÔNG TY TNHH KỸ THUẬT QMI",
      represent: "Trần Võ Sơn C",
    },
    title: "HỢP ĐỒNG CUNG ỨNG LAO ĐỘNG 03",
    activationDate: "13/03/2024",
    expiredDate: "12/01/2025",
  },
  {
    id: "SCT-202404",
    parties: {
      name: "CÔNG TY TNHH ĐẠI LÝ VẬN TẢI HIGH SEA",
      represent: "Nguyễn Thị D",
    },
    title: "HỢP ĐỒNG CUNG ỨNG LAO ĐỘNG 04",
    activationDate: "08/10/2024",
    expiredDate: "07/12/2024",
  },
  {
    id: "SCT-202405",
    parties: {
      name: "CÔNG TY CỔ PHẦN SỬA CHỮA TÀU VÀ DỊCH VỤ LẶN BIG SEA",
      represent: "Nguyễn Văn Quốc E",
    },
    title: "HỢP ĐỒNG CUNG ỨNG LAO ĐỘNG 05",
    activationDate: "26/12/2024",
    expiredDate: "25/01/2025",
  },
  {
    id: "SCT-202406",
    parties: {
      name: "CÔNG TY TNHH KỸ THUẬT TÀU VÀ DỊCH VỤ HÀNG HẢI NICE SEA",
      represent: "Trần Văn F",
    },
    title: "HỢP ĐỒNG CUNG ỨNG LAO ĐỘNG 06",
    activationDate: "22/12/2024",
    expiredDate: "21/03/2025",
  },
];


export const mockSupplyRequest = [
  {
    id: "SQ-202401",
    partnerName: "CÔNG TY TNHH KỸ THUẬT HÀNG HẢI SÀI GÒN CỬU LONG",
    representInfo: {
      name: "Nguyễn Văn A",
      email: "example01@gmail.com",
      phoneNumber: "0123456789",
    },
    shipInfo: {
      id: "SH-01",
      IMONumber: "9538335",
      name: "RUI NING 7",
      countryCode: "CN",
      type: "Tàu hàng",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/3423988.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-07 18:36 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-12 07:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "VN SGN", //departureLocation
    endLocation: "ID MUB", //arrivalLocation
  },
  {
    id: "SQ-202402",
    partnerName: "VIETNAM SHIPCHANDLER AND REPAIR WORKSHOP",
    representInfo: {
      name: "Nguyễn Thị B",
      email: "example02@gmail.com",
      phoneNumber: "0999888293",
    },
    shipInfo: {
      id: "SH-02",
      IMONumber: "9835056",
      name: "ENDEAVOUR II",
      countryCode: "SG",
      type: "Tàu dầu",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/5192604.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-02 18:36 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 12:49 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "ID MUB", //departureLocation
    endLocation: "VN CMT", //arrivalLocation
  },
  {
    id: "SQ-202403",
    partnerName: "CÔNG TY TNHH KỸ THUẬT QMI",
    representInfo: {
      name: "Trần Văn C",
      email: "example03@gmail.com",
      phoneNumber: "0544237812",
    },
    shipInfo: {
      id: "SH-03",
      IMONumber: "9426946",
      name: "PVT MERCURY",
      countryCode: "VN",
      type: "Tàu chở dầu thô",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/1837842.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-11-19 13:58 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 15:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "VN CLI", //departureLocation
    endLocation: "SG SIN", //arrivalLocation
  },
  {
    id: "SQ-202404",
    partnerName: "CÔNG TY TNHH ĐẠI LÝ VẬN TẢI HIGH SEA",
    representInfo: {
      name: "Lê Văn D",
      email: "example04@gmail.com",
      phoneNumber: "0666876463",
    },
    shipInfo: {
      id: "SH-04",
      IMONumber: "9187904",
      name: "SC HONGKONG",
      countryCode: "HK",
      type: "Tàu chở dầu thô - Loại hàng nguy hiểm B",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/593008.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-06 04:59 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 01:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "MY KUA", //departureLocation
    endLocation: "VN DNA", //arrivalLocation
  },
  {
    id: "SQ-202405",
    partnerName: "CÔNG TY CỔ PHẦN SỬA CHỮA TÀU VÀ DỊCH VỤ LẶN BIG SEA",
    representInfo: {
      name: "Đỗ Thị E",
      email: "example05@gmail.com",
      phoneNumber: "0965647763",
    },
    shipInfo: {
      id: "SH-05",
      IMONumber: "9406271",
      name: "DANUM 173",
      countryCode: "MY",
      type: "Tàu hàng",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/3413680.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-05 21:52 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 18:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "CN QZH", //departureLocation
    endLocation: "VN SGN", //arrivalLocation
  },
  {
    id: "SQ-202406",
    partnerName: "CÔNG TY TNHH KỸ THUẬT TÀU VÀ DỊCH VỤ HÀNG HẢI NICE SEA",
    representInfo: {
      name: "Huỳnh Văn F",
      email: "example06@gmail.com",
      phoneNumber: "0444928837",
    },
    shipInfo: {
      id: "SH-06",
      IMONumber: "9146780",
      name: "MORNING VINAFCO",
      countryCode: "VN",
      type: "Tàu hàng",
      description: "", //
      imageUrl:
        "https://images.marinetraffic.com/collection/370804.webp?size=800",
      registrationNumber: "", //
    },
    startDate: "2024-12-07 00:09 (UTC+7)", //timeOfDeparture
    estimatedEndTime: "2024-12-08 22:00 (UTC+7)", //estimatedTimeOfArrival
    startLocation: "VN DAD", //departureLocation
    endLocation: "VN SGN", //arrivalLocation
  },
];

export const mockTemplateContracts = [
  {
    id: "TCT-001",
    title: "Mẫu hợp đồng Cung ứng thuyền viên 1",
    description: "Hợp đồng Cung ứng",
    image: "",
  },
  {
    id: "TCT-002",
    title: "Mẫu hợp đồng Lao động thuyền viên 2",
    description: "Hợp đồng Lao động",
    image: "",
  },
  {
    id: "TCT-003",
    title: "Mẫu hợp đồng Lao động thuyền viên 3",
    description: "Hợp đồng Lao động",
    image: "",
  },
  {
    id: "TCT-004",
    title: "Mẫu hợp đồng Cung ứng thuyền viên 4",
    description: "Hợp đồng Cung ứng",
    image: "",
  },
  {
    id: "TCT-005",
    title: "Mẫu hợp đồng Lao động thuyền viên 5",
    description: "Hợp đồng Lao động",
    image: "",
  },
  {
    id: "TCT-006",
    title: "Mẫu hợp đồng Cung ứng thuyền viên 6",
    description: "Hợp đồng Cung ứng",
    image: "",
  },
];

export const mockCourses = [
  {
    id: "COURSE-001",
    name: "Khóa đào tạo thuyền viên 1",
    description: "Khóa đào tạo thuyền viên của công ty INLACO",
    courseImage:
      "https://photo-cms-giaoduc.zadn.vn/w700/Uploaded/2022/juznus/2021_03_31/5-sinh-vien-khoa-hang-hai-thuc-hanh-tren-tau-vmu-viet-han-273-1014.jpg",
    trainingPartner: "Đại học Hàng hải",
    trainingPartnerLogo:
      "https://upload.wikimedia.org/wikipedia/vi/thumb/1/11/Bi%E1%BB%83u_tr%C6%B0ng_Tr%C6%B0%E1%BB%9Dng_%C4%91%E1%BA%A1i_h%E1%BB%8Dc_H%C3%A0ng_h%E1%BA%A3i_Vi%E1%BB%87t_Nam.svg/220px-Bi%E1%BB%83u_tr%C6%B0ng_Tr%C6%B0%E1%BB%9Dng_%C4%91%E1%BA%A1i_h%E1%BB%8Dc_H%C3%A0ng_h%E1%BA%A3i_Vi%E1%BB%87t_Nam.svg.png",
    positionAchieved: "",
    isCertificateCourse: false,
    limitStudent: 150,
  },
  {
    id: "COURSE-002",
    name: "Khóa đào tạo thuyền viên 2",
    description: "Khóa đào tạo thuyền viên của công ty INLACO",
    courseImage:
      "https://media.vneconomy.vn/w800/images/upload/2022/10/18/dao-tao-thuyen-vien.jpg",
    trainingPartner: "Đại học GTVT TPHCM",
    trainingPartnerLogo:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/LogoUTC.jpg",
    positionAchieved: "Thợ máy",
    isCertificateCourse: true,
    limitStudent: 50,
  },
  {
    id: "COURSE-003",
    name: "Khóa đào tạo thuyền viên 3",
    description: "Khóa đào tạo thuyền viên của công ty INLACO",
    courseImage:
      "https://baogiaothong.mediacdn.vn/upload/images/2022-3/article_img/2022-09-27/img-bgt-2021-dai-hoc-hang-hai-vn-trang-bi-phong-mo-phong-cho-cac-sinh-vien-nganh-di-bien-thuc-hanh-1664270470-width1280height854.jpg",
    trainingPartner: "Đại học Nha Trang",
    trainingPartnerLogo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_NTU.png",
    positionAchieved: "",
    isCertificateCourse: false,
    limitStudent: 100,
  },
  {
    id: "COURSE-004",
    name: "Khóa đào tạo thuyền viên 4",
    description: "Khóa đào tạo thuyền viên của công ty INLACO",
    courseImage:
      "https://media.vneconomy.vn/w800/images/upload/2022/10/18/dao-tao-thuyen-vien.jpg",
    trainingPartner: "Đại học Tài nguyên và Môi trường TPHCM",
    trainingPartnerLogo:
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/HUNRE_Logo.png",
    positionAchieved: "",
    isCertificateCourse: false,
    limitStudent: 125,
  },
  {
    id: "COURSE-005",
    name: "Khóa đào tạo thuyền viên 5",
    description: "Hợp đồng Lao động",
    courseImage:
      "https://baogiaothong.mediacdn.vn/upload/images/2022-3/article_img/2022-09-27/img-bgt-2021-dai-hoc-hang-hai-vn-trang-bi-phong-mo-phong-cho-cac-sinh-vien-nganh-di-bien-thuc-hanh-1664270470-width1280height854.jpg",
    trainingPartner: "Đại học Bách khoa TPHCM",
    trainingPartnerLogo:
      "https://tuyensinhhot.com/file/5cc2997cc9e77c000112ff80/Logo-BK-HoChiMinh.png",
    positionAchieved: "Sỹ quan boong",
    isCertificateCourse: true,
    limitStudent: 32,
  },

  {
    id: "COURSE-006",
    name: "Khóa đào tạo thuyền viên 6",
    description: "Khóa đào tạo thuyền viên của công ty INLACO",
    courseImage:
      "https://photo-cms-giaoduc.zadn.vn/w700/Uploaded/2022/juznus/2021_03_31/5-sinh-vien-khoa-hang-hai-thuc-hanh-tren-tau-vmu-viet-han-273-1014.jpg",
    trainingPartner: "Cao đẳng hàng hải I",
    trainingPartnerLogo:
      "https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Cao-dang-Hang-Hai-I-MC1.png",
    positionAchieved: "",
    isCertificateCourse: false,
    limitStudent: 150,
  },
];