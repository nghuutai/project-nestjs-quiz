import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class QuizMigration1631624114676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "quiz",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
                {
                    name: "subjectId",
                    type: "uuid",
                },
                {
                    name: "question",
                    type: "varchar",
                },
                {
                    name: "correct_answer",
                    type: "varchar",
                },
                {
                    name: "incorrect_answer",
                    type: "json",
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

        await queryRunner.createForeignKey("quiz", new TableForeignKey({
            columnNames: ["subject_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "subject",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
