import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductMigration1626857452900 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "product",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "type",
                    type: "varchar",
                },
                {
                    name: "price",
                    type: "integer",
                },
                {
                    name: "create_date",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "modify_date",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product");
    }

}
