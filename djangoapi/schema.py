
import graphene
import graphql_jwt
import graphql_social_auth


from gjwt_auth.mutations import (
    Activate,
    DeleteAccount,
    Register,
    ResetPassword,
    ResetPasswordConfirm,
)

from djangoapi.todos import schema as todos_schema

class Query(todos_schema.Query, graphene.ObjectType):
    pass

class Mutation(graphene.ObjectType):
    activate = Activate.Field()
    register = Register.Field()
    deleteAccount = DeleteAccount.Field()
    resetPassword = ResetPassword.Field()
    resetPasswordConfirm = ResetPasswordConfirm.Field()

    social_auth = graphql_social_auth.SocialAuth.Field()
    social_auth_complete = graphql_social_auth.SocialAuthComplete.Field()

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

    create_todo = todos_schema.CreateTodo.Field()
    update_todo = todos_schema.UpdateTodo.Field()
    delete_todo = todos_schema.DeleteTodo.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
