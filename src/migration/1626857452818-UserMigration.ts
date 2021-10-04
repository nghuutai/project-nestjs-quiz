import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1626857452818 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
                {
                    name: "username",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "role",
                    type: "varchar",
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

        await queryRunner.query(`INSERT INTO user(id, username, password, role) VALUES(uuid_generate_v4(),'admin','admin','admin')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
