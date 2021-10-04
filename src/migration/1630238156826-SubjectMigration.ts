import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class SubjectMigration1630238156826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "subject",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
                {
                    name: "name",
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
        }), true);

        await queryRunner.query(`INSERT INTO subject(id, name) VALUES(uuid_generate_v4(),'OOP')`);
        await queryRunner.query(`INSERT INTO subject(id, name) VALUES(uuid_generate_v4(), 'Data Structures')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("subject");
    }

}
