from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Todo(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='todos'
    )

    def __str__(self):
        return 'Todo: {}'.format(self.title[:20])

    def set_properties(self, **kwargs):
        """set_properties update properties on model instance, but don't save

        :param **kwargs: properties to update
        """
        for key, val in kwargs.items():
            if val is not None:
                setattr(self, key, val)
