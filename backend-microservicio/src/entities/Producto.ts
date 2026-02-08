import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  nombre: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  costo: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  porcentaje_retorno: number;

  @CreateDateColumn()
  created_at: Date;
}
