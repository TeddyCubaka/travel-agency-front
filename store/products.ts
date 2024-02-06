
import { Op_command, Op_command_line, Op_product, Rf_category } from "../interfaces";

export let category: Rf_category[] = [
    {
        ID: 1,
        stt_tag: "catc2107-3c02-4c3d-8251-06508b1fd59494",
        label: "billeterie",
        partner_ID: 1,
        is_available: 1,
        created_at: "10/12/2023",
        updated_at: "10/12/2023",
        Id_user_create_at: 1,
    },
    {
        ID: 2,
        stt_tag: "catc2107-3c02-4c3d-8251-06508b1fd59837",
        label: "loacation voiture",
        partner_ID: 1,
        is_available: 1,
        created_at: "10/12/2023",
        updated_at: "10/12/2023",
        Id_user_create_at: 1,
    },
];

export let products: Op_product[] = [
    {
        ID: 1,
        stt_tag: "proc2107-3c02-4c3d-8251-06508b1fd59837",
        label: "billet economique",
        partner_ID: 1,
        stock_quantity: 99,
        is_available: true,
        category_ID: 1,
        created_at: "10/12/2023",
        updated_at: "10/12/2023",
        Id_user_create_at: 1,
        unit_price: 753,
        currency: "USD",
    }, {
        ID: 2,
        stt_tag: "proc2107-3c02-4c3d-8251-06508b1fd598fa",
        label: "billet business",
        partner_ID: 1,
        stock_quantity: 58,
        is_available: true,
        category_ID: 1,
        created_at: "10/12/2023",
        updated_at: "10/12/2023",
        Id_user_create_at: 1,
        unit_price: 384,
        currency: "USD",
    },
    {
        ID: 3,
        stt_tag: "proc2107-3c02-4c3d-8251-06508b1fd593fb",
        label: "location voiture",
        partner_ID: 1,
        stock_quantity: 10,
        is_available: true,
        category_ID: 2,
        created_at: "10/12/2023",
        updated_at: "10/12/2023",
        Id_user_create_at: 1,
        unit_price: 300,
        currency: "USD",
    }

]
