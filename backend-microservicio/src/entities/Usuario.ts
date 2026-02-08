import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  nombre: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  capital_disponible: number;

  @CreateDateColumn()
  created_at: Date;
}
