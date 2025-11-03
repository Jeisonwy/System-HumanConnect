# schemas.py
from extensions import ma
from models import Empleado
from marshmallow import fields, validate, post_load, EXCLUDE


class EmpleadoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Empleado
        load_instance = False  # ✅ cambiamos a False para evitar conflicto con @post_load
        unknown = EXCLUDE

    idEmpleado = ma.auto_field()
    nombre = ma.auto_field(required=True, validate=validate.Length(min=1))
    departamento = ma.auto_field(required=True, validate=validate.Length(min=1))
    sueldo = fields.Decimal(as_string=True, required=True)
    correo = ma.auto_field(required=True, validate=validate.Email())

    # Contraseña solo al cargar (no se devuelve nunca)
    contrasena = fields.String(
        load_only=True,
        required=True,
        validate=validate.Length(min=6)
    )

    @post_load
    def make_empleado(self, data, **kwargs):
        """
        Crea una instancia del modelo Empleado a partir de los datos cargados.
        Si viene una contraseña, la encripta usando el método set_password().
        """
        contrasena = data.pop("contrasena", None)
        emp = Empleado(**data)
        if contrasena:
            emp.set_password(contrasena)
        return emp


# Esquemas individuales y múltiples
empleado_schema = EmpleadoSchema()
empleados_schema = EmpleadoSchema(many=True)
