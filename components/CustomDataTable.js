import DataTable, { createTheme } from "react-data-table-component";

export default function CustomDataTable({reservations, columns, title}) {
    console.log('reservations ', reservations);
    createTheme('first', {
        text: {
            primary: '#01220d',
            secondary: '#6a7272',
        },
        background: {
            default: '#ecfff4',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#ded',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'light');

    return (
        <DataTable
            data={reservations}
            columns={columns}
            title={title}
            theme="first"
            pagination
            highlightOnHover
            responsive
            // striped
            // selectableRows
        />
    );
}