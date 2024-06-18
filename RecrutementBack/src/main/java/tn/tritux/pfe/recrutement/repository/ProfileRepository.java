package tn.tritux.pfe.recrutement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.tritux.pfe.recrutement.entity.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile,Long> {
}
