"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Expense } from "@/components/data-table/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Expense>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-0.5"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-0.5"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="title" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "fullName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Full Name" />
        ),
        cell: ({ row }) => {
            const firstName = row.original.firstName || "";
            const middleName = row.original.middleName || "";
            const lastName = row.original.lastName || "";
            return (
                <div className="capitalize w-[200px]">
                    {`${firstName} ${middleName} ${lastName}`.trim()}
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="email" />
        ),
        cell: ({ row }) => (
            <div className="w-[130px] truncate">{row.getValue("email")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("phone")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gender" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("gender")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "dateOfBirth",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="dateOfBirth" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span className="capitalize"> {row.getValue("dateOfBirth")}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "age",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Age" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("age")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "aadhaarNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Aadhaar No" />
        ),
        cell: ({ row }) => (
            <div>{row.getValue("aadhaarNumber") || "Not Available"}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "voterId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Voter ID" />
        ),
        cell: ({ row }) => (
            <div className="w-[100px] capitalize">{row.getValue("voterId") || "Not Available"}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "referralCode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Referral Code" />
        ),
        cell: ({ row }) => (
            <div className="uppercase">{row.getValue("referralCode")}</div>
        ),
    },
    {
        accessorKey: "referralCount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Referrals" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span className="capitalize"> {row.getValue("referralCount")}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];